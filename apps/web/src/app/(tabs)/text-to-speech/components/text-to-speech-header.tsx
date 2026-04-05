import React from 'react';
import {
  textToSpeechLink,
  textToSpeechWhy,
} from '../../_components/data/text-to-speech';
import WhyDrawer from '../../_components/why-drawer';
import { TextToSpeechOptions } from './text-to-speech-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModelSelector } from '../../_components/model-selector';

interface TextToSpeechHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
}

export default function TextToSpeechHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
}: TextToSpeechHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center min-w-0">
        <SidebarTrigger
          size={'lg'}
          className="mr-1 md:mr-3 block md:hidden scale-112"
        />
        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-2xl md:text-4xl truncate">
            TextToSpeech
          </h1>
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

        <WhyDrawer
          title="texttospeech"
          link={textToSpeechLink}
          items={textToSpeechWhy}
        />

        <TextToSpeechOptions
          onSessionReset={onSessionReset}
          link={textToSpeechLink}
        />
      </div>
    </div>
  );
}
