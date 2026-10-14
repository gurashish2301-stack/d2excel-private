import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';
import { unified } from '@astrojs/markdown-remark';
import guideArticle from './src/plugins/guide-article.mjs';

// Private design-lab routes (src/lab). Present in `astro dev` and in `npm run build:lab` only; the normal
// production build never contains them. Even when present they are noindex and outside the sitemap.
const LAB = readdirSync('./src/lab').filter((f) => f.endsWith('.astro')).map((f) => f.replace('.astro', ''));
const lab = {
  name: 'd2e-lab',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev' && process.env.D2E_LAB !== '1') return;
      for (const p of LAB) injectRoute({ pattern: `/lab/${p}`, entrypoint: `./src/lab/${p}.astro` });
    },
  },
};

// `site` is only used to build canonical and social-share URLs. Nothing is deployed from here.
export default defineConfig({
  site: 'https://d2excel.com',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  // The guides are presented by a rehype plugin (comments dropped, callouts, tables, sources), which needs the unified processor.
  markdown: { processor: unified({ rehypePlugins: [guideArticle] }) },
  // The placeholder guide pages were replaced by the real articles under new slugs.
  redirects: {
    '/guides/paying-for-college/': '/guides/college-money/',
    '/guides/what-a-major-is-worth/': '/guides/major-worth/',
    '/guides/how-to-choose-a-college-counselor/': '/guides/choose-a-counselor/',
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/lab/') }), lab],
});
