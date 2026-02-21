import { Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NotificationBar() {
  return (
    <div className="flex flex-row items-center justify-between border-b-2 bg-white dark:bg-black px-12 py-3">
      <p className="text-sm">
        This Project currently on test stage and uses mock data.(until backend
        get deployed successfully)
      </p>
      <div className="flex flex-row items-center">
        <Link
          className="flex flex-row text-sm items-center gap-1
          text-blue-500 px-3 py-1 rounded-full cursor-pointer"
          href="/https://github.com/"
          target="_blank"
        >
          <Github className="h-4 w-4 shrink-0" />
          Frontend
        </Link>
        <Link
          className="flex flex-row text-sm items-center gap-1
          text-green-500 px-3 py-1 rounded-full cursor-pointer"
          href="/https://github.com/"
          target="_blank"
        >
          <Github className="h-4 w-4 shrink-0" />
          Backend
        </Link>
      </div>
    </div>
  );
}
