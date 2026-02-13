import { notFound } from 'next/navigation';
import { allPages } from '.contentlayer/generated';
import { Mdx } from '@/components/content/mdx-components';

interface PagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PagePage({ params }: PagePageProps) {
  const { slug } = await params;
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx code={page.body.code} images={[]} />
    </article>
  );
}
