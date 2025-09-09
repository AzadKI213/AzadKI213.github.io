export const prerender = true;

const siteUrl = (Astro.site ?? new URL('http://localhost/')).toString();

export async function GET() {
  const all = await Astro.glob('../content/blog/**/*.md');
  const posts = all
    .filter(p => p.frontmatter?.draft !== true)
    .sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  const items = posts.map((p) => {
    const slug = p.file.split('/').pop().replace(/\.md$/, '');
    const url = new URL(`blog/${slug}/`, siteUrl).toString();
    return `
      <item>
        <title><![CDATA[${p.frontmatter.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
        <description><![CDATA[${p.frontmatter.description || ''}]]></description>
      </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>The Ascension</title>
  <link>${siteUrl}</link>
  <description>A journey through technology, consciousness, and the cosmic dance.</description>
  ${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}