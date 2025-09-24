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
  const posts = await loadPosts();

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
  <title>Frost Journal</title>
  <link>${siteUrl}</link>
  <description>Quiet essays about deliberate work, useful tools, and building with intention.</description>
  ${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
