#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: npm run new "Post Title" --tags="A,B" --draft');
  process.exit(1);
}
const title = args[0].replace(/^"+|"+$/g, '');
const tagsArg = args.find(a => a.startsWith('--tags='));
const draftArg = args.find(a => a === '--draft');

const tags = tagsArg ? tagsArg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : [];
const draft = !!draftArg;

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const date = `${yyyy}-${mm}-${dd}`;

const slugBase = title.toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');
const fileName = `${date}-${slugBase}.md`;

const dir = path.join('src', 'content', 'blog');
fs.mkdirSync(dir, { recursive: true });

const fm = `---\n` +
  `title: "${title}"\n` +
  `date: "${date}"\n` +
  `description: ""\n` +
  `tags: [${tags.map(t => `"${t}"`).join(', ')}]\n` +
  `cover: ""\n` +
  `draft: ${draft}\n` +
  `---\n\n` +
  `Write something great here.\n`;

const full = path.join(dir, fileName);
if (fs.existsSync(full)) {
  console.error(`File exists: ${full}`);
  process.exit(1);
}
fs.writeFileSync(full, fm, 'utf-8');
console.log(`Created: ${full}`);