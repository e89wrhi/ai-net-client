import { useSidebar } from '@/components/ui/sidebar';
import { Sidebar } from 'lucide-react';

export function SidebarHeaderLayout() {
  const { open, setOpen } = useSidebar();

  return (
    <div
      onClick={() => setOpen(!open)}
      className="flex items-center pl-2 tracking-tight hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="flex h-8 w-8 items-center justify-center shrink-0 rounded-lg hover:bg-accent transition-colors">
        <Sidebar className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
      </div>
    </div>
  );
}
