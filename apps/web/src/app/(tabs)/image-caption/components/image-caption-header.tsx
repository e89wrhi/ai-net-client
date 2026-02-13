import React from 'react';
import {
  imageCaptionLink,
  imageCaptionWhy,
} from '../../_components/data/image-caption';
import WhyDrawer from '../../_components/why-drawer';
import { ImageCaptionOptions } from './image-caption-options';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ImageCaptionHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Image Caption</h1>
          <p className="text-gray-600">
            Smart text suggestions for emails, forms, and messages with style
            adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <WhyDrawer
          title="imagecaption"
          link={imageCaptionLink}
          items={imageCaptionWhy}
        />

        <ImageCaptionOptions link={imageCaptionLink} />
      </div>
    </div>
  );
}
