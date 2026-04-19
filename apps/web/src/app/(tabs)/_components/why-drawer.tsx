import MaxWidthWrapper from '@/components/layout/detail-width-wrapper';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { WhyItem } from '@/types';
import Link from 'next/link';
import { Info } from 'lucide-react';

export interface WhyProps {
  title: string;
  link: string;
  items: WhyItem[];
}

export default function WhyDrawer({ title, link, items }: WhyProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-full h-9 w-9 md:h-auto p-0 md:px-4"
        >
          <Info className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Learn</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mt-5 mx-5 p-6 bg-white dark:bg-black rounded-2xl max-h-[90vh]">
        <div className="overflow-y-auto">
          <MaxWidthWrapper>
            <DrawerHeader>
              <DrawerTitle className="font-bold uppercase text-4xl">
                {title}
              </DrawerTitle>
              <DrawerTitle className="font-bold text-2xl">
                In .NET AI
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-12">
              {items.map((item) => (
                <div
                  key={item.title}
                  id={item.title}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Sticky Section Title */}
                  <div className="sticky top-0 flex items-start pt-1 md:pt-4 md:text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </div>

                  {/* Content */}
                  <div className="col-span-2 flex flex-col gap-4 text-gray-700 dark:text-gray-300">
                    <p className="text-base md:text-lg leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA Section */}
              <div className="mt-8 p-6 shadow-md text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Ready to Integrate .NET?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 md:text-lg">
                  Start adding AI-powered Autocomplete to your app today.
                </p>
                <Link href={`${link}`} passHref>
                  <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
        <DrawerClose asChild>
          <Button variant="ghost" className="mt-6 w-full">
            Close
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
