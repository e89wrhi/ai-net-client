'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Plus, X, Bot, User, Sparkles } from 'lucide-react';
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
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tabs, activeTab]);

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

  const handleSend = async () => {
    if (isStreaming || !input.trim()) return;
    setIsStreaming(true);
    await sendMessage();
  };

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
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }

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
      setIsStreaming(false);
    } catch (error) {
      setIsStreaming(false);
      console.error('Chat generation failed:', error);
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto p-2 md:p-4 h-[calc(100dvh-80px)] md:h-[calc(100dvh-40px)] flex flex-col">
      <TextGenHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <Card
        className="p-0 border-none mt-4 md:mt-6 bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]
                   rounded-[2.5rem] overflow-hidden
                   ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all
                   duration-500 hover:ring-primary/20 flex flex-col flex-1 min-h-0"
      >
        {/* Tab bar */}
        <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-neutral-100 dark:border-neutral-800 flex-shrink-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 min-w-0"
          >
            <TabsList className="bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 flex gap-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-full text-xs px-3 py-1 group relative data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm"
                >
                  {tab.name}
                  {tabs.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab.id);
                      }}
                      className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 p-0.5"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            size="sm"
            variant="ghost"
            onClick={addTab}
            className="rounded-full h-8 w-8 p-0 flex-shrink-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {currentTab?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-4 select-none">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full">
                <Sparkles className="h-10 w-10 text-neutral-300 dark:text-neutral-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-neutral-500">
                  Start a conversation
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  Press Enter to send · Shift+Enter for new line
                </p>
              </div>
            </div>
          ) : (
            currentTab?.messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 mb-0.5 shadow-sm">
                    <Bot className="h-4 w-4 text-white dark:text-black" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-sm'
                  } ${
                    message.content === ''
                      ? 'animate-pulse min-w-[60px] min-h-[36px]'
                      : ''
                  }`}
                >
                  {message.content ||
                    (message.role === 'assistant' ? '...' : '')}
                </div>
                {message.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <User className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sticky frosted-glass input bar */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-end gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-2 ring-1 ring-transparent focus-within:ring-primary/30 transition-all">
            <Textarea
              ref={textareaRef}
              placeholder="Message... (Shift+Enter for new line)"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                const el = e.target;
                el.style.height = '44px';
                el.style.height = Math.min(el.scrollHeight, 160) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 border-none bg-transparent shadow-none resize-none p-0 text-sm min-h-[44px] max-h-[160px] focus-visible:ring-0 placeholder:text-neutral-400"
              rows={1}
            />
            <div className="flex items-center gap-2 flex-shrink-0 pb-1">
              <span className="text-[10px] text-neutral-400 hidden sm:block tabular-nums">
                {input.length > 0 ? `${input.length}` : ''}
              </span>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                size="icon"
                className="h-9 w-9 rounded-xl flex-shrink-0 shadow-sm transition-all disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-neutral-400 text-center mt-2">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </Card>
    </div>
  );
}
