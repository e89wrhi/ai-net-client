'use client';

import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const technologies = [
  {
    name: 'GPT-4',
    link: 'https://openai.com',
  },
  {
    name: 'Gemini',
    link: 'https://google.gemini.com',
  },
  {
    name: 'Grok',
    link: 'https://grok.com',
  },
  {
    name: 'React',
    link: 'https://react.com',
  },
  {
    name: 'TypeScript',
    link: 'https://typescript.com',
  },
  {
    name: 'Next.js',
    link: 'https://nextjs.com',
  },
  {
    name: '.NET',
    link: 'https://dotnet.com',
  },
  {
    name: 'PostgreSQL',
    link: 'https://postgres.com',
  },
  {
    name: 'Redis',
    link: 'https://redis.com',
  },
  {
    name: 'Docker',
    link: 'https://docker.com',
  },
  {
    name: 'Asp.net',
    link: 'https://dotnet.com',
  },
];

export function TechStack() {
  const router = useRouter();
  const handleOpen = (link: string) => {
    router.push(link);
  };

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl">Powered By</h2>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                onClick={() => handleOpen(tech.link)}
                className="px-4 py-2 cursor-pointer text-sm rounded-full"
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
