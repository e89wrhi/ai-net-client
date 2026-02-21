import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { AppSidebar } from './_components/home-sidebar';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { getCurrentUser } from '@/lib/api/user/get-current';
import { redirect } from 'next/navigation';
import NotificationBar from '@/components/shared/notification-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function FeaturesLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  // Extract userId from session to fetch admin profile
  // next-auth session user might have userId if we added it to the session callback
  const userId = session?.user?.id;
  // Fetch the admin profile using the authenticated user's userId
  const userProfile = userId ? await getCurrentUser() : null;
  // If session exists but no admin profile linked, don't open the portal
  if (!userProfile) {
    redirect('/login?error=SessionNotFound');
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex min-h-screen flex-col"
    >
      <AppSidebar userProfile={userProfile} />
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
        <NotificationBar />
        {children}
      </div>
    </SidebarProvider>
  );
}
