import React from 'react';
import { resumeLink, resumeWhy } from '../../_components/data/resume';
import WhyDrawer from '../../_components/why-drawer';
import { ResumeOptions } from './resume-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModelSelector } from '../../_components/model-selector';

interface ResumeHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
}

export default function ResumeHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
}: ResumeHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Resume</h1>
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
        <WhyDrawer title="resume" link={resumeLink} items={resumeWhy} />
        <ResumeOptions onSessionReset={onSessionReset} link={resumeLink} />
      </div>
    </div>
  );
}
