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
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center min-w-0">
        <SidebarTrigger
          size={'lg'}
          className="mr-1 md:mr-3 block md:hidden scale-112"
        />
        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-2xl md:text-4xl truncate">Chat</h1>
          <p className="text-gray-600 hidden md:block">
            Smart text suggestions for emails, forms, and messages with style
            adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-1.5 md:space-x-3 flex-shrink-0 flex-nowrap">
        <ModelSelector
          value={selectedModel}
          onValueChange={onModelChange}
          className="w-[110px] md:w-[200px]"
        />

        <WhyDrawer title="chat" link={chatLink} items={chatWhy} />

        <ChatOptions onSessionReset={onSessionReset} link={chatLink} />
      </div>
    </div>
  );
}
