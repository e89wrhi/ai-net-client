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
      title: 'Autocomplete',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Text Autocomplete</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Enhance your writing experience with AI suggestions for text,
            emails, or documents.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/autocomplete/`}>
            <Button className="rounded-full">Try Autocomplete</Button>
          </Link>
          <Image
            src="/illustrations/autocomplete.png"
            alt="Autocomplete Feature"
            height={1300}
            width={1300}
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
      title: 'Image Caption',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Image Caption Generator</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Upload an image and let AI generate a descriptive caption
            automatically.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/image-caption`}>
            <Button className="rounded-full">Try Captions</Button>
          </Link>
          <Image
            src="/illustrations/imagecaption.png"
            alt="Image Caption Feature"
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
      title: 'Learning Assistant',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Learning Assistant</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Create lessons, quizzes, and learning material automatically using
            AI.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/learning`}>
            <Button className="rounded-full">Try Learning</Button>
          </Link>
          <Image
            src="/illustrations/learning.png"
            alt="Learning Assistant Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Meeting Summarizer',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Meeting Summarizer</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Upload audio or video of meetings and generate transcripts and
            summaries automatically.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/meeting`}>
            <Button className="rounded-full">Try Summary</Button>
          </Link>
          <Image
            src="/illustrations/meeting.png"
            alt="Meeting Summarizer Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Resume Analyzer',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Resume Analyzer</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Analyze resumes to extract skills, experience, and suggestions for
            improvement.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/resume`}>
            <Button className="rounded-full">Try Analyzing</Button>
          </Link>
          <Image
            src="/illustrations/resume.png"
            alt="Resume Analyzer Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Sentiment',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Sentiment Analysis</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Analyze text content to detect positive, negative, or neutral
            sentiment automatically.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/sentiment`}>
            <Button className="rounded-full">Try Sentiment</Button>
          </Link>
          <Image
            src="/illustrations/sentiment.png"
            alt="Sentiment Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Speech To Text',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Speech to Text</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Convert audio speech into written text quickly and accurately.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/speech-to-text`}>
            <Button className="rounded-full">Try Converting</Button>
          </Link>
          <Image
            src="/illustrations/speechtotext.png"
            alt="Speech to Text Feature"
            height={1500}
            width={1500}
            className="h-60 w-60 mt-5"
          />
        </div>
      ),
    },
    {
      title: 'Text To Speech',
      content: (
        <div>
          <p className="mb-2 text-lg md:text-2xl">Text to Speech</p>
          <p className="mb-8 text-md md:text-xl text-neutral-700 dark:text-neutral-300">
            Convert written text into natural-sounding speech audio.
          </p>
          <Link href={`${env.NEXT_PUBLIC_HOME_URL}/text-to-speech`}>
            <Button className="rounded-full">Try Converting</Button>
          </Link>
          <Image
            src="/illustrations/texttospeech.png"
            alt="Text to Speech Feature"
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
