import React from 'react';
import { qnaLink, qnaWhy } from '../../_components/data/question';
import WhyDrawer from '../../_components/why-drawer';
import { QuestionOptions } from './question-options';

import OutputTypePicker from '@/components/shared/output-type-picker';
import { ModelSelector } from '../../_components/model-selector';

interface QHeaderProps {
  selectedModel: string | null;
  onSessionReset?: () => void;
  onModelChange: (model: string | null) => void;
  responseType: 'stream' | 'json';
  onResponseTypeChange: (type: 'stream' | 'json') => void;
}

export default function QuestionHeader({
  selectedModel,
  onSessionReset,
  onModelChange,
  responseType,
  onResponseTypeChange,
}: QHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center min-w-0">
        
        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-2xl md:text-4xl truncate">Q & A</h1>
          <p className="text-gray-600 hidden md:block">
            Interactive AI assistant for context-aware queries and deep insights
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-1.5 md:space-x-3 flex-shrink-0 flex-nowrap">
        <ModelSelector
          value={selectedModel}
          onValueChange={onModelChange}
          className="w-[110px] md:w-[200px]"
        />
        <OutputTypePicker
            type={responseType}
            onChange={(value) =>
              onResponseTypeChange(value as 'stream' | 'json')
            }
          />

        <WhyDrawer title="question" link={qnaLink} items={qnaWhy} />

        <QuestionOptions onSessionReset={onSessionReset} link={qnaLink} />
      </div>
    </div>
  );
}
