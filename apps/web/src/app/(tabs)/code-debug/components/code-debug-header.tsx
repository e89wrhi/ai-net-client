import React from 'react';
import { codeDebugLink, codeDebugWhy } from '../../_components/data/code-debug';
import WhyDrawer from '../../_components/why-drawer';
import { CodeDebugOptions } from './code-debug-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModelSelector } from '../../_components/model-selector';

interface CodeDebugHeaderProps {
  selectedModel: string | null;
  onModelChange: (model: string | null) => void;
}

export default function CodeDebugHeader({
  selectedModel,
  onModelChange,
}: CodeDebugHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Debug Code</h1>
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

        <WhyDrawer
          title="codedebug"
          link={codeDebugLink}
          items={codeDebugWhy}
        />

        <CodeDebugOptions link={codeDebugLink} />
      </div>
    </div>
  );
}
