import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ModelSelectorProps {
  value: string | null;
  onValueChange: (value: string | null) => void;
  className?: string;
}

const AI_MODELS = [
  { id: null, name: 'Auto (Default)' },
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
  { id: 'gemini-pro', name: 'Gemini Pro' },
];

export function ModelSelector({
  value,
  onValueChange,
  className,
}: ModelSelectorProps) {
  return (
    <Select
      value={value ?? 'auto'}
      onValueChange={(v) => onValueChange(v === 'auto' ? null : v)}
    >
      <SelectTrigger
        className={`rounded-full bg-neutral-200 dark:bg-neutral-800 border-none`}
      >
        <SelectValue placeholder="Select AI Model" />
      </SelectTrigger>
      <SelectContent>
        {AI_MODELS.map((model) => (
          <SelectItem key={model.id ?? 'auto'} value={model.id ?? 'auto'}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
