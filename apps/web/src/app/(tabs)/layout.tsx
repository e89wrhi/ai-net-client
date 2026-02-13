import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { AppSidebar } from './_components/home-sidebar';
import { cookies } from 'next/headers';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function FeaturesLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex min-h-screen flex-col"
    >
      <AppSidebar />
      <div
        id="content"
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'sm:transition-[width] sm:duration-200 sm:ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
        )}
      >
        {children}
      </div>
    </SidebarProvider>
  );
}
