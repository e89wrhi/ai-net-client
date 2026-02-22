import React from 'react';
import { imageEditLink, imageEditWhy } from '../../_components/data/image-edit';
import WhyDrawer from '../../_components/why-drawer';
import { ImageEditOptions } from './image-edit-options';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModelSelector } from '../../_components/model-selector';

interface ImageHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
}

export default function ImageEditHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
}: ImageHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Edit Image</h1>
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
          title="edit image"
          link={imageEditLink}
          items={imageEditWhy}
        />

        <ImageEditOptions
          onSessionReset={onSessionReset}
          link={imageEditLink}
        />
      </div>
    </div>
  );
}
