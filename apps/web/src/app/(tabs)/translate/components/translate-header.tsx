import React from 'react';
import { translateLink, translateWhy } from '../../_components/data/translate';
import WhyDrawer from '../../_components/why-drawer';
import { TranslateOptions } from './translate-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import OutputTypePicker from '@/components/shared/output-type-picker';
import { ModelSelector } from '../../_components/model-selector';

interface TranslateHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
  responseType: 'stream' | 'json';
  onResponseTypeChange: (type: 'stream' | 'json') => void;
}

export default function TranslateHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
  responseType,
  onResponseTypeChange,
}: TranslateHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center min-w-0">
        <SidebarTrigger
          size={'lg'}
          className="mr-1 md:mr-3 block md:hidden scale-112"
        />
        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-2xl md:text-4xl truncate">Translate</h1>
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

        <div className="hidden sm:block">
          <OutputTypePicker
            type={responseType}
            onChange={(value) =>
              onResponseTypeChange(value as 'stream' | 'json')
            }
          />
        </div>

        <WhyDrawer
          title="translate"
          link={translateLink}
          items={translateWhy}
        />

        <TranslateOptions
          onSessionReset={onSessionReset}
          link={translateLink}
        />
      </div>
    </div>
  );
}
