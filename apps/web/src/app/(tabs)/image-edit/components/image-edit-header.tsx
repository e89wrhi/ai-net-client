import React from 'react';
import { imageEditLink, imageEditWhy } from '../../_components/data/image-edit';
import WhyDrawer from '../../_components/why-drawer';
import { ImageEditOptions } from './image-edit-options';

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
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center min-w-0">
        
        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-2xl md:text-4xl truncate">
            Edit Image
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
