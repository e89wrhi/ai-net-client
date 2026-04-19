import { Zap, FileJson } from 'lucide-react';
import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

interface Props {
  type: string;
  onChange: (type: string) => void;
}

export default function OutputTypePicker(props: Props) {
  const { type, onChange } = props;
  return (
    <Select
      value={type}
      onValueChange={(value) => onChange(value as 'stream' | 'json')}
    >
      <SelectTrigger className="w-[60px] md:w-[140px] px-2 md:px-4 h-8 md:h-10 text-xs md:text-sm rounded-full bg-neutral-200 dark:bg-neutral-800 border-none flex justify-center">
        <SelectValue placeholder="Format" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-none shadow-lg p-2 space-y-3">
        <SelectItem value="stream" className="rounded-xl cursor-pointer">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden md:inline">Streaming</span>
          </div>
        </SelectItem>
        <SelectItem value="json" className="rounded-xl cursor-pointer">
          <div className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            <span className="hidden md:inline">JSON (Direct)</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
