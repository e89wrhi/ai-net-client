import { SiteFooter } from '@/components/layout/site-footer';
import { Navigation } from '@/components/layout/mainnav';
import { TooltipProvider } from '@/components/ui/tooltip';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  );
}
