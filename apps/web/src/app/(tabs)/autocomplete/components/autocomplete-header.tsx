import React from 'react';
import {
  autocompleteLink,
  autocompleteWhy,
} from '../../_components/data/autocomplete';
import WhyDrawer from '../../_components/why-drawer';
import { AutocompleteOptions } from './autocomplete-options';

import OutputTypePicker from '@/components/shared/output-type-picker';
import { ModelSelector } from '../../_components/model-selector';

interface AutocompleteHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
  responseType: 'stream' | 'json';
  onResponseTypeChange: (type: 'stream' | 'json') => void;
}

export default function AutocompleteHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
  responseType,
  onResponseTypeChange,
}: AutocompleteHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center min-w-0">
        
        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-2xl md:text-4xl truncate">
            Autocomplete
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
          className="w-[110px] md:w-[180px]"
        />

        <OutputTypePicker
            type={responseType}
            onChange={(value) =>
              onResponseTypeChange(value as 'stream' | 'json')
            }
          />

        <WhyDrawer
          title="autocomplete"
          link={autocompleteLink}
          items={autocompleteWhy}
        />

        <AutocompleteOptions
          onSessionReset={onSessionReset}
          link={autocompleteLink}
        />
      </div>
    </div>
  );
}
