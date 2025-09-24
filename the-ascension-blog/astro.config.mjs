import { defineConfig } from 'astro/config';

// 动态基路径：用户站点 -> '/', 项目站点 -> '/<repo>'
// 来自 GitHub Actions 注入：BASE_PATH（见 workflow）
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://azadki213.github.io/',
  base,
  server: { port: 4321 },
  integrations: [],
  vite: {
    build: { target: 'es2020' }
  }
});