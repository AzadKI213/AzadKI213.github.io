export const prerender = true;

const modules = import.meta.glob('../content/blog/**/*.md');

async function loadPosts() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const mod = await loader();
      return { ...mod, file: path };
    })
  );

  return entries
    .filter((entry) => entry.frontmatter?.draft !== true)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export async function GET({ site }) {
  const siteUrl = (site ?? new URL('http://localhost/')).toString();
  const urls = [];

  urls.push(new URL('', siteUrl).toString());
  urls.push(new URL('blog/', siteUrl).toString());

  const posts = await loadPosts();
  const PAGE_SIZE = 12;
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  for (let i = 2; i <= totalPages; i++) {
    urls.push(new URL(`blog/${i}`, siteUrl).toString());
  }

  for (const p of posts) {
    const slug = p.file.split('/').pop().replace(/\.md$/, '');
    urls.push(new URL(`blog/${slug}/`, siteUrl).toString());
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((u) => `<url><loc>${u}</loc></url>`).join('\n  ')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
