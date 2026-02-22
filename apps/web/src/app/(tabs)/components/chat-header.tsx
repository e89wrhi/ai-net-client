import React from 'react';
import { chatLink, chatWhy } from '../../(tabs)/_components/data/chat';
import WhyDrawer from '../../(tabs)/_components/why-drawer';
import { ChatOptions } from './chat-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModelSelector } from '../_components/model-selector';

interface ChatHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
}

export default function ChatHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
}: ChatHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Chat</h1>
          <p className="text-gray-600">
            Smart text suggestions for emails, forms, and messages with style
            adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <ModelSelector
          value={selectedModel}
          onValueChange={onModelChange}
          className="w-[200px]"
        />

        <WhyDrawer title="chat" link={chatLink} items={chatWhy} />

        <ChatOptions onSessionReset={onSessionReset} link={chatLink} />
      </div>
    </div>
  );
}
