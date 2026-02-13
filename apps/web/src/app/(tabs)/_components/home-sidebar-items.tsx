import { ReactNode } from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { NavLink, type NavGroup } from '@/types/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavGroupp({ title, items }: NavGroup) {
  return (
    <SidebarGroup className="px-2 py-2">
      <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-4">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items && item.enabled)
            return (
              <SidebarMenuLink
                key={key}
                href={item.url}
                item={{
                  url: item.url,
                  icon: item.icon,
                  title: item.title,
                  enabled: item.enabled,
                  badge: item.badge,
                }}
              />
            );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge variant="secondary" className="rounded-full px-2 py-0 text-xs ml-auto">
    {children}
  </Badge>
);

const SidebarMenuLink = ({ item }: { item: NavLink; href: string }) => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const isActive = checkIsActive(pathname ?? '', item.url);
  const IconComponent = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={cn(
          'w-full h-10 px-3 py-2 rounded-full my-1 transition-all duration-200',
          isActive
            ? 'bg-green-400 text-white dark:text-black font-semibold hover:bg-primary/20'
            : 'text-foreground/80 hover:bg-muted'
        )}
      >
        <Link
          href={item.url}
          onClick={() => setOpenMobile(false)}
          className="flex items-center gap-3"
        >
          {IconComponent && <IconComponent className="h-8 w-8 shrink-0" />}
          <span className="flex-grow text-sm truncate">{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

function normalizePath(path: string) {
  const segments = path.split('/').filter(Boolean);

  const first = segments[0];
  if (first && first.length === 2) {
    segments.shift();
  }

  // Remove query params and trailing slash
  const cleanPath = '/' + segments.join('/');
  return cleanPath.endsWith('/') && cleanPath !== '/'
    ? cleanPath.slice(0, -1)
    : cleanPath;
}

function checkIsActive(href: string, itemUrl: string) {
  const current = normalizePath(href);
  const target = normalizePath(itemUrl);

  if (!target || target === '#') return false; // never active for placeholders

  if (target === '/en' || target === '/') {
    return current === target;
  }

  return current === target || current.startsWith(target + '/');
}
