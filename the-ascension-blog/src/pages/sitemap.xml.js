export const prerender = true;

const siteUrl = (Astro.site ?? new URL('http://localhost/')).toString();

export async function GET() {
  const urls = [];

  // 首页与列表
  urls.push(new URL('', siteUrl).toString());
  urls.push(new URL('blog/', siteUrl).toString());

  // 分页
  const all = await Astro.glob('../content/blog/**/*.md');
  const posts = all.filter(p => p.frontmatter?.draft !== true)
                   .sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  const PAGE_SIZE = 12;
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  for (let i = 2; i <= totalPages; i++) {
    urls.push(new URL(`blog/${i}`, siteUrl).toString());
  }

  // 文章详情
  for (const p of posts) {
    const slug = p.file.split('/').pop().replace(/\.md$/, '');
    urls.push(new URL(`blog/${slug}/`, siteUrl).toString());
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n  ')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}