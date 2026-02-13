import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const defaultComputedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc.slug,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => {
      const parts = doc._raw.flattenedPath.split('/');
      return parts[parts.length - 1];
    },
  },
};

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
  },
  computedFields: defaultComputedFields,
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
    ],
  },
});
