'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, Plus, X, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TextGenHeader from './text-gen-header';

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
  const [creativity, setCreativity] = useState([0.7]);
  const [length, setLength] = useState('medium');
  const [style, setStyle] = useState('balanced');
  const [showSettings, setShowSettings] = useState(false);

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

  const sendMessage = () => {
    if (!input.trim()) return;

    const currentTab = tabs.find((tab) => tab.id === activeTab);
    if (!currentTab) return;

    const userMessage: Message = { role: 'user', content: input };

    // Simulate AI response
    const aiResponse: Message = {
      role: 'assistant',
      content: `This is a simulated AI response to: "${input}". In a real implementation, this would connect to an AI API like GPT-4 or Claude. Settings applied: Creativity ${creativity[0]}, Length: ${length}, Style: ${style}.`,
    };

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === activeTab) {
        return {
          ...tab,
          messages: [...tab.messages, userMessage, aiResponse],
        };
      }
      return tab;
    });

    setTabs(updatedTabs);
    setInput('');
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="container mx-auto py-2">
      <TextGenHeader />

      <Card className="p-8 border-none rounded-3xl">
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

          <Button
            size="sm"
            variant={showSettings ? 'default' : 'outline'}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {showSettings && (
          <Card className="p-4 mb-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm mb-2 block">
                  Creativity: {creativity[0]}
                </label>
                <Slider
                  value={creativity}
                  onValueChange={setCreativity}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Response Length</label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm mb-2 block">Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

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
      </Card>
    </div>
  );
}
