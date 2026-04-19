'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Plus, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useGenerateStream } from '@/lib/api/chat/generate-stream';
import { useGenerateResponse } from '@/lib/api/chat/generate';
import { useSendMessage } from '@/lib/api/chat/send-message';
import TextGenHeader from './chat-header';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatTab {
  id: string;
  name: string;
  messages: Message[];
}

export default function TextGenerationClient() {
  const [tabs, setTabs] = useState<ChatTab[]>([
    { id: '1', name: 'Chat 1', messages: [] },
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [input, setInput] = useState('');
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Toggle for development
  const USE_MOCK = true;

  const mockChatStream = async function* () {
    const response = `This is a simulated AI response. 

The text is being streamed chunk by chunk to demonstrate how the UI handles real-time data arrival. You can continue the conversation or try switching to JSON mode for a static response.

Key features demonstrated:
- Real-time text appending
- Smooth UI updates
- State management across multiple tabs`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 30 + Math.random() * 50)
      );
      yield chunk;
    }
  };

  const mockChatJson = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `[JSON Response] This is a static response returned at once after processing. JSON mode is useful for structured data or when you don't need real-time feedback.`;
  };

  const addTab = () => {
    const newId = (tabs.length + 1).toString();
    setTabs([...tabs, { id: newId, name: `Chat ${newId}`, messages: [] }]);
    setActiveTab(newId);
  };

  const closeTab = (id: string) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      setActiveTab(newTabs[0]!.id);
    }
  };

  const { mutateAsync: sendMsgApi } = useSendMessage();
  const { mutateAsync: generateStreamApi } = useGenerateStream();
  const { mutateAsync: generateResponseApi } = useGenerateResponse();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentTabId = activeTab;
    const currentTab = tabs.find((tab) => tab.id === currentTabId);
    if (!currentTab) return;

    const userMessage: Message = { role: 'user', content: input };
    const aiMessagePlaceholder: Message = { role: 'assistant', content: '' };

    // Optimistic update
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id === currentTabId) {
          return {
            ...tab,
            messages: [...tab.messages, userMessage, aiMessagePlaceholder],
          };
        }
        return tab;
      })
    );
    setInput('');

    try {
      if (!USE_MOCK) {
        await sendMsgApi({ SessionId: currentTabId, Content: input });
      }

      if (responseType === 'stream') {
        const stream = USE_MOCK
          ? mockChatStream()
          : await generateStreamApi({
              SessionId: currentTabId,
              ModelId: selectedModel,
            });

        let accumulatedContent = '';
        for await (const chunk of stream) {
          accumulatedContent += chunk;
          setTabs((curr) =>
            curr.map((tab) => {
              if (tab.id === currentTabId) {
                const msgs = [...tab.messages];
                // Update last message (ai placeholder)
                if (
                  msgs.length > 0 &&
                  msgs[msgs.length - 1]!.role === 'assistant'
                ) {
                  msgs[msgs.length - 1] = {
                    role: 'assistant',
                    content: accumulatedContent,
                  };
                }
                return { ...tab, messages: msgs };
              }
              return tab;
            })
          );
        }
      } else {
        const content = USE_MOCK
          ? await mockChatJson()
          : (
              await generateResponseApi({
                SessionId: currentTabId,
                ModelId: selectedModel,
              })
            )?.Content;

        if (content) {
          setTabs((curr) =>
            curr.map((tab) => {
              if (tab.id === currentTabId) {
                const msgs = [...tab.messages];
                if (
                  msgs.length > 0 &&
                  msgs[msgs.length - 1]!.role === 'assistant'
                ) {
                  msgs[msgs.length - 1] = {
                    role: 'assistant',
                    content: content,
                  };
                }
                return { ...tab, messages: msgs };
              }
              return tab;
            })
          );
        }
      }
    } catch (error) {
      console.error('Chat generation failed:', error);
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <TextGenHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <Card
        className="p-0 border-none mt-10 bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1"
            >
              <div className="flex items-center gap-2">
                <TabsList>
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="relative group"
                    >
                      {tab.name}
                      {tabs.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            closeTab(tab.id);
                          }}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button size="sm" variant="outline" onClick={addTab}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Tabs>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4 p-4 rounded-lg">
            {currentTab?.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Start a conversation by typing a message below
              </div>
            ) : (
              currentTab?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white dark:text-black'
                        : 'bg-black dark:bg-white text-white dark:text-black'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message here... (Press Enter to send)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1"
              rows={3}
            />
            <Button onClick={sendMessage} size="icon" className="h-auto">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
