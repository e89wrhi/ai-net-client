'use client';

import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const Steps = () => {
  const data = [
    {
      title: 'Chat',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Conversational Chat bot</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/`}>
            <Button className="rounded-full">Start Chat</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step3.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Autocomplete',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Autocomplete Text, Email..
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/autocomplete/`}>
            <Button className="rounded-full">Try Autocomplete</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step1.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Debug Code',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Code Debugging.
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/code-debug`}>
            <Button className="rounded-full">Try Debugging</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Generate Code',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Generate Code
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/code-gen`}>
            <Button className="rounded-full">Try Coding</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step3.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Image Caption',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Generate Caption by Analyzing Image
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/image-caption`}>
            <Button className="rounded-full">Try Captions</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Edit Image',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Edit Image, Remove Background...
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/image-edit`}>
            <Button className="rounded-full">Try Editing</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step3.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Generate Image',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Generate Image
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/image-gen`}>
            <Button className="rounded-full">Try Images</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Learning Assistant',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Learning Assistant, Generate Lessons..
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/learning`}>
            <Button className="rounded-full">Try Learning</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step3.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Meeting Summarizer',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Summarize Meeting Audio, Generate Transcript..
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/meeting`}>
            <Button className="rounded-full">Try Summary</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Resume Analyzer',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Resume Analyzer...
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/resume`}>
            <Button className="rounded-full">Try Analyzing</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step3.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Sentiment',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Text Content Sentiment
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/sentiment`}>
            <Button className="rounded-full">Try Sentiment</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Speech To Text',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Convert Speech audio to text
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/speech-to-text`}>
            <Button className="rounded-full">Try Converting</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step3.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Text To Speech',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Convert text to speech audio
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/text-to-speech`}>
            <Button className="rounded-full">Try Converting</Button>
          </Link>
          <Image
            src="/empty.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Translate',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Translate Text to Multiple Languages
          </p>{' '}
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            this is a sample summary or short description about the feature. and
            it use what function in Microsoft.Extensions.AI
          </p>
          <Link href={`http://localhost:3000/`}>
            <Button className="rounded-full">Try Translation</Button>
          </Link>
          <Image
            src="/error.png"
            alt={'how.step2.title'}
            height={300}
            width={300}
            className="h-70 w-70"
          />
        </div>
      ),
    },
  ];

  return data;
};

export function Features() {
  return (
    <div className="relative w-full overflow-clip">
      <h1 className="font-bold text-4xl mt-10 md:mt-15">Features</h1>
      <Timeline data={Steps()} />
    </div>
  );
}
