import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { TechStack } from '@/components/sections/techstack';
import ContentWidthWrapper from '@/components/layout/content-width-wrapper';

export default function Home() {
  return (
    <ContentWidthWrapper>
      <Hero />
      <Features />
      <TechStack />
    </ContentWidthWrapper>
  );
}
