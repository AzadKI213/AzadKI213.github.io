# The Ascension — Astro Blog

- **SITE_TITLE**: The Ascension  
- **SITE_DESC**: A journey through technology, consciousness, and the cosmic dance.  
- **AUTHOR_NAME**: Kyrie  
- **AUTHOR_BIO**: AI 产品经理 / Context Engineering 爱好者  
- **托管**: GitHub Pages（用户站点或项目站点）  

## 本地开发
```bash
npm i
npm run dev
# 打开 http://localhost:4321
```

## 写作（命令行创建文章）
```bash
npm run new "My first post" --tags="Agent,CE" --draft
```
- 会在 `src/content/blog/` 生成 Markdown 文件（带 frontmatter）。
- 默认 `draft: true`（如果不带 `--draft` 则为 `false`）。

**草稿显示**  
- 站点默认不展示草稿。  
- 本地开发可通过 URL 加 `?drafts=1` 强制显示草稿。

## 构建
```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages
1. Push 到 GitHub 仓库的 `main` 分支。  
2. 仓库 -> Settings -> Pages -> 构建来源选 **GitHub Actions**。  
3. 工作流 `.github/workflows/astro.yml` 会自动构建并发布。  
4. 自动识别用户站点 / 项目站点：  
   - 仓库名以 `.github.io` 结尾 → `base = '/'`  
   - 否则 → `base = '/<仓库名>'`

## 文章 Frontmatter
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "One sentence summary."
tags: ["Agent","CE"]
cover: "/cover/example.jpg" # 可留空
draft: false
---
```

## 路由
- 首页 `/`：头像、简介、社交链接、**近期 5 篇文章**  
- 文章列表 `/blog/`：分页（默认 12/页）  
- 文章详情 `/blog/<slug>/`  
- RSS `/rss.xml`  
- Sitemap `/sitemap.xml`  
- 404 `/404`

## 注意
- 不使用外链字体/CDN，样式统一在 `src/styles/global.css`。  
- Pages **用户站点** URL: `https://<username>.github.io/`  
- Pages **项目站点** URL: `https://<username>.github.io/<repo>/`