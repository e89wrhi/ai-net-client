import React from 'react';
import {
  textToSpeechLink,
  textToSpeechWhy,
} from '../../_components/data/text-to-speech';
import WhyDrawer from '../../_components/why-drawer';
import { TextToSpeechOptions } from './text-to-speech-options';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function TextToSpeechHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">TextToSpeech</h1>
          <p className="text-gray-600">
            Smart text suggestions for emails, forms, and messages with style
            adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <WhyDrawer
          title="texttospeech"
          link={textToSpeechLink}
          items={textToSpeechWhy}
        />

        <TextToSpeechOptions link={textToSpeechLink} />
      </div>
    </div>
  );
}
