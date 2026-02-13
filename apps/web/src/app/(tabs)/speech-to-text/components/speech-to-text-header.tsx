import React from 'react';
import {
  speechToTextLink,
  speechToTextWhy,
} from '../../_components/data/speech-to-text';
import WhyDrawer from '../../_components/why-drawer';
import { SpeechToTextOptions } from './speech-to-text-options';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SpeechToTextHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">SpeechToText</h1>
          <p className="text-gray-600">
            Smart text suggestions for emails, forms, and messages with style
            adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <WhyDrawer
          title="speechtotext"
          link={speechToTextLink}
          items={speechToTextWhy}
        />

        <SpeechToTextOptions link={speechToTextLink} />
      </div>
    </div>
  );
}
