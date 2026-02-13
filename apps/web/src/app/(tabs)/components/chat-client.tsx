'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import ChatHeader from './chat-header';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };

    // Simulate AI response with personality
    const responses = {
      friendly: `Hey! Thanks for your message. ${input.includes('?') ? "Here's what I think:" : 'I appreciate you sharing that!'} This is a conversational AI demo showing how context is maintained across messages. Your previous messages are remembered in this session!`,
      formal: `I acknowledge your inquiry regarding: "${input}". Allow me to provide a comprehensive response. This demonstration showcases the AI's ability to maintain conversational context while adhering to the selected personality profile.`,
      funny: `Haha, love it! About "${input}" - you know what? This AI is like a good joke, it gets better with context! 🎭 I remember everything we've talked about in this chat session. Pretty cool, right?`,
    };

    const aiResponse: Message = {
      role: 'assistant',
      content: responses['formal' as keyof typeof responses],
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <div className="container mx-auto py-2">
      <ChatHeader />

      <Card className="p-2 border-none bg-transparent">
        <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4 p-4 rounded-lg">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <div className="text-center">
                <p className="mb-2">Start a conversation</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600'
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
            💡 This AI remembers your conversation. It maintains context across
            all {messages.length} messages.
          </p>
        )}
      </Card>
    </div>
  );
}
