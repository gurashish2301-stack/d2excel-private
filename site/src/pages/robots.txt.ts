import type { APIRoute } from 'astro';
import { NOINDEX, SITE_URL } from '../config';

export const GET: APIRoute = () =>
  new Response(
    NOINDEX
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
