---
title: "My publishing workflow"
date: "2024-06-05"
description: "A step-by-step checklist for drafting and shipping new essays."
tags: ["Workflow","Process"]
cover: ""
draft: false
---

Every essay in this journal starts as a Markdown file. Here's the checklist I follow to ship a new piece without the frantic finish:

1. **Capture the outline.** I draft headings and questions in my notes app, then copy them into a fresh Markdown file.
2. **Run `npm run new`.** The script creates the file with front matter so dates, tags, and RSS feeds stay accurate.
3. **Write in focused blocks.** I edit locally with a timer running (usually 45-minute sessions). Commit early and often.
4. **Preview before publishing.** `npm run dev` spins up the site at `http://localhost:4321` so I can see typography, links, and mobile layout.
5. **Ship with intention.** After the final proofread I run `npm run build` and push the changes. GitHub Pages handles the rest.

Publishing this way keeps the site lightweight and makes every improvement transparent. Feel free to fork the repo and adapt the checklist to your own rhythm.
