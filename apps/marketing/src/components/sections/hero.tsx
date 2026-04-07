'use client';

import { Button } from '@/components/ui/button';
import { Sparkle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { env } from '../../../env.mjs';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
        },
      });

      // Animate buttons
      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
        },
      });

      // Animate stats
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
        },
      });

      // Floating/pulse animation on image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Gradient background subtle animation
      gsap.to(gradientRef.current, {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white dark:bg-black py-5 md:py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="bg-gray-100 dark:bg-gray-900 inline-flex items-center gap-2 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">powered by</span>
              <Link
                href={'https://dotnet.com/'}
                target="_blank"
                className="font-semibold text-sm"
              >
                .NET
              </Link>
            </div>

            <div className="space-y-4" ref={textRef}>
              <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl tracking-tight">
                AI-net
                <br />
                <span className="font-medium">ai on .net framework.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                show casing ai in .net framework
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center" ref={buttonsRef}>
              <Link href={`${env.NEXT_PUBLIC_HOME_URL}/`}>
                <Button size="lg" className="rounded-full gap-2">
                  Try Features
                  <Sparkle className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={'/pricing'}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full gap-2"
                >
                  Pricing
                </Button>
              </Link>
            </div>

            <div className="flex gap-8 pt-4" ref={statsRef}>
              <div>
                <div className="text-3xl">16+</div>
                <div className="text-sm text-gray-600">AI Tools</div>
              </div>
              <div>
                <div className="text-3xl">100K+</div>
                <div className="text-sm text-gray-600">Users</div>
              </div>
              <div>
                <div className="text-3xl">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative" ref={imageRef}>
            <div
              ref={gradientRef}
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-3xl"
            ></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                height={200}
                width={200}
                src="/cover_dark.png"
                alt="AI Platform Dashboard"
                className="hidden dark:block w-full h-auto"
              />
              <Image
                height={200}
                width={200}
                src="/cover_light.png"
                alt="AI Platform Dashboard"
                className="block dark:hidden w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
