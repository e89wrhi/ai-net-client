'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import ChatHeader from './chat-header';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [recentChats, setRecentChats] = useState<ChatSession[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // ------------------------
  // Load Mock Recent Chats on mount
  // ------------------------
  useEffect(() => {
    const mockChats: ChatSession[] = [
      {
        id: '1',
        title: 'Project Timeline...',
        messages: [
          {
            role: 'user',
            content: 'Can you help me outline the project timeline?',
          },
          {
            role: 'assistant',
            content:
              'Sure! We can start with the major milestones and deadlines.',
          },
        ],
      },
      {
        id: '2',
        title: 'Marketing Strategy...',
        messages: [
          {
            role: 'user',
            content: 'Suggest a social media marketing strategy for Q2.',
          },
          {
            role: 'assistant',
            content:
              'I recommend focusing on Instagram and LinkedIn campaigns, targeting engagement and lead generation.',
          },
        ],
      },
      {
        id: '3',
        title: 'Resume Tips...',
        messages: [
          {
            role: 'user',
            content:
              'How can I improve my resume for a software engineer role?',
          },
          {
            role: 'assistant',
            content:
              'Highlight your technical skills, projects, and measurable achievements. Tailor keywords to the job description.',
          },
        ],
      },
    ];

    setRecentChats(mockChats);

    // Optionally load first chat by default
    setMessages(mockChats[0]!.messages);
  }, []);

  // ------------------------
  // Send Message
  // ------------------------
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };

    // Simulated AI response
    const aiResponse: Message = {
      role: 'assistant',
      content: `AI Response: "${input}" - This is a simulated response maintaining context in this chat.`,
    };

    const newMessages = [...messages, userMessage, aiResponse];
    setMessages(newMessages);

    // Update recent chats (latest on top)
    const chatTitle = newMessages[0]!.content.slice(0, 20) + '...';
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: chatTitle,
      messages: newMessages,
    };

    setRecentChats([newChat, ...recentChats].slice(0, 5));
    setInput('');
  };

  // ------------------------
  // Load Recent Chat
  // ------------------------
  const loadChat = (chat: ChatSession) => {
    setMessages(chat.messages);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-4 space-y-6">
      <ChatHeader
        selectedModel={selectedModel}
        onSessionReset={handleReset}
        onModelChange={setSelectedModel}
      />
      {recentChats.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mb-4">
          {recentChats.map((chat) => (
            <Button
              key={chat.id}
              variant="outline"
              onClick={() => loadChat(chat)}
            >
              {chat.title}
            </Button>
          ))}
        </div>
      )}

      {/* Chat Window */}
      <Card className="p-4 border-none bg-transparent">
        <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4 p-4 rounded-lg">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <p className="text-center">Start a conversation</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-card shadow-sm'
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
            placeholder="Type your message... (Press Enter to send)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1"
            rows={2}
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="flex h-9 w-9 rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {messages.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            💡 This AI remembers your conversation. Context is maintained across
            all {messages.length} messages.
          </p>
        )}
      </Card>
    </div>
  );
}
