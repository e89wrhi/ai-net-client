'use client';

import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="group fixed right-8 bottom-8 z-50 hidden size-10 bg-background/80 hover:bg-background shadow-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp
        name="lucide:arrow-up"
        className="mx-auto size-4 transition-all group-hover:-translate-y-0.5"
      />
    </Button>
  );
}
