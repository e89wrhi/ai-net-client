import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { TechStack } from '@/components/sections/techstack';

export default function Home() {
  return (
    <main className="max-w-6xl min-h-screen bg-white dark:bg-black">
      <Hero />
      <Features />
      <TechStack />
    </main>
  );
}
