import React from 'react';
import {
  simplepluginLink,
  simplepluginWhy,
} from '../../_components/data/simpleplugin';
import WhyDrawer from '../../_components/why-drawer';
import { SimplePluginOptions } from './simpleplugin-options';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SimplePluginHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Plugins</h1>
          <p className="text-gray-600">Try ai plugins</p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <WhyDrawer
          title="simpleplugin"
          link={simplepluginLink}
          items={simplepluginWhy}
        />

        <SimplePluginOptions link={simplepluginLink} />
      </div>
    </div>
  );
}
