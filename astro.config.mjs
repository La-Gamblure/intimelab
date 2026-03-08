// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeTableWrapper from './src/plugins/rehype-table-wrapper.mjs';
import rehypeTablePills from './src/plugins/rehype-table-pills.mjs';

export default defineConfig({
  site: 'https://intimelab.fr',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeTablePills,
      rehypeTableWrapper,
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
