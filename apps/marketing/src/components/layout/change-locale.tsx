'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

export function LocaleChange({ pathname }: { pathname: string }) {
  const router = useRouter();

  function switchTo(locale: string) {
    // Save language preference in a cookie (expires in 1 year)
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    // Update the URL
    const segments = pathname.split('/');
    segments[1] = locale;
    router.replace(segments.join('/'));
    window.location.href = segments.join('/');
    //router.push(`/${locale}/` + url);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className=" 
                rounded-full h-7 w-7 px-0"
        >
          <Icons.lang className="h-5 w-5" />
          <span className="sr-only"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          <DropdownMenuItem
            onClick={() => {
              switchTo('');
            }}
          >
            <span>English</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
