'use client';

import React from 'react';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

interface Props {
  title?: string;
}
export default function ListHeader(props: Props) {
  const title = props.title ? props.title : 'Items';

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-black">
      <div className="flex flex-row pt-3 my-4 ml-5 items-center gap-4">
        <SidebarTrigger className="scale-140" />
        <p className="text-xl font-semibold">{title}</p>
      </div>
      <Separator />
    </div>
  );
}
