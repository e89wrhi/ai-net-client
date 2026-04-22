'use client';

import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { env } from '../../../env.mjs';

const Steps = () => {
  const data = [
    {
      title: 'Chat',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Conversational Chat Bot</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Interact with an AI-powered chatbot that remembers your conversation
            and provides contextual responses.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/`}>
            <Button className="rounded-full">Start Chat</Button>
          </Link>
          <Image
            src="/illustrations/chat.png"
            alt="Chat Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Debug Code',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Code Debugging</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Identify and fix errors in your code efficiently using AI-powered
            debugging suggestions.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/code-debug`}>
            <Button className="rounded-full">Try Debugging</Button>
          </Link>
          <Image
            src="/illustrations/codedebug.png"
            alt="Debug Code Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Generate Code',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Generate Code</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Quickly generate boilerplate or complex code snippets using AI based
            on your requirements.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/code-gen`}>
            <Button className="rounded-full">Try Coding</Button>
          </Link>
          <Image
            src="/illustrations/codegen.png"
            alt="Generate Code Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Edit Image',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Image Editing</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Edit images, remove backgrounds, or apply AI-powered enhancements in
            seconds.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/image-edit`}>
            <Button className="rounded-full">Try Editing</Button>
          </Link>
          <Image
            src="/illustrations/imageedit.png"
            alt="Edit Image Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Generate Image',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Image Generation</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Generate original images from text prompts using AI-powered image
            generation.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/image-gen`}>
            <Button className="rounded-full">Try Images</Button>
          </Link>
          <Image
            src="/illustrations/imagegen.png"
            alt="Generate Image Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Translate',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Text Translation</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Translate text into multiple languages quickly and accurately.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/translate`}>
            <Button className="rounded-full">Try Translation</Button>
          </Link>
          <Image
            src="/illustrations/translate.png"
            alt="Translate Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
  ];

  return data;
};

export function Features() {
  return (
    <div className="relative w-full overflow-clip bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h1 className="font-bold text-4xl mt-10 md:mt-15">Features</h1>
      </div>
      <Timeline data={Steps()} />
    </div>
  );
}
