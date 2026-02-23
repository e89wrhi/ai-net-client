import React from 'react';
import {
  textGenerationLink,
  textGenerationWhy,
} from '../../_components/data/text-gen';
import WhyDrawer from '../../_components/why-drawer';
import { TextGenOptions } from './text-gen-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import OutputTypePicker from '@/components/shared/output-type-picker';
import { ModelSelector } from '../../_components/model-selector';

interface TextGenHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
  responseType: 'stream' | 'json';
  onResponseTypeChange: (type: 'stream' | 'json') => void;
}

export default function TextGenHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
  responseType,
  onResponseTypeChange,
}: TextGenHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">TextGen</h1>
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

        <OutputTypePicker
          type={responseType}
          onChange={(value) => onResponseTypeChange(value as 'stream' | 'json')}
        />

        <WhyDrawer
          title="textgen"
          link={textGenerationLink}
          items={textGenerationWhy}
        />

        <TextGenOptions
          onSessionReset={onSessionReset}
          link={textGenerationLink}
        />
      </div>
    </div>
  );
}
