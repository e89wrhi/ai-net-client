import ContentWidthWrapper from '@/components/layout/content-width-wrapper';
import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { TechStack } from '@/components/sections/techstack';

export default function Home() {
  return (
    <ContentWidthWrapper className="min-h-screen">
      <Hero />
      <Features />
      <TechStack />
    </ContentWidthWrapper>
  );
}
