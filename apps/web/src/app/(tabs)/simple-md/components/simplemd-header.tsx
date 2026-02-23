import React from 'react';
import { simplemdLink, simplemdWhy } from '../../_components/data/simplemd';
import WhyDrawer from '../../_components/why-drawer';
import { SimpleMDOptions } from './simplemd-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import OutputTypePicker from '@/components/shared/output-type-picker';
import { ModelSelector } from '../../_components/model-selector';

interface MDHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
  responseType: 'stream' | 'json';
  onResponseTypeChange: (type: 'stream' | 'json') => void;
}

export default function SimpleMDHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
  responseType,
  onResponseTypeChange,
}: MDHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">SimpleMD</h1>
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

        <WhyDrawer title="simplemd" link={simplemdLink} items={simplemdWhy} />

        <SimpleMDOptions onSessionReset={onSessionReset} link={simplemdLink} />
      </div>
    </div>
  );
}
