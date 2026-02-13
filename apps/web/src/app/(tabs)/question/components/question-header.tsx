import React from 'react';
import { qnaLink, qnaWhy } from '../../_components/data/question';
import WhyDrawer from '../../_components/why-drawer';
import { QuestionOptions } from './question-options';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function QuestionHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <SidebarTrigger
          size={'lg'}
          className="mr-3 block md:hidden 
        scale-112 mt-2"
        />
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Q & A</h1>
          <p className="text-gray-600">
            Smart text suggestions for emails, forms, and messages with style
            adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <WhyDrawer title="question" link={qnaLink} items={qnaWhy} />

        <QuestionOptions link={qnaLink} />
      </div>
    </div>
  );
}
