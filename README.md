# Frank Guo Developer Site

This repository contains the source code for [frankguo.dev](https://frankguo.dev), the personal developer website of Frank Guo.

The site serves as a public profile for Frank's work in AI tools, AI-assisted creation, independent development, personal branding, and practical project building. It is designed to help visitors understand who Frank is, what he focuses on, and where to follow his work.

## Overview

The website is a lightweight, bilingual static site with English as the default language and Chinese as an alternate version. It combines a personal profile, public GitHub activity, social links, and essential site metadata into a simple developer homepage.

Key areas of focus include:

- AI tools, workflows, prompts, agents, and automation
- AI-assisted writing, image, video, and content creation
- Independent development and hands-on project practice
- Personal branding, domain identity, and proof of work
- Global-facing content and English-first publishing

## Features

- English and Chinese versions
- Responsive personal profile layout
- GitHub profile, repository, activity, and commit summaries
- SEO-friendly metadata, canonical URLs, hreflang tags, and structured data
- Open Graph and Twitter Card metadata for social sharing
- Custom favicon, app icons, web manifest, and brand assets
- Privacy, disclaimer, and custom 404 pages

## Project Structure

```text
.
├── index.html                         # English homepage
├── zh/index.html                      # Chinese homepage
├── legal.html                         # English privacy and disclaimer page
├── zh/legal.html                      # Chinese privacy and disclaimer page
├── 404.html                           # Custom 404 page
├── github-data.json                   # Cached public GitHub data
├── sitemap.xml                        # XML sitemap
├── robots.txt                         # Search crawler rules
├── llms.txt                           # LLM-oriented site summary
├── humans.txt                         # Human-readable site credits
├── site.webmanifest                   # Web app manifest
├── CNAME                              # Custom GitHub Pages domain
└── .github/
    ├── scripts/update-github-cache.mjs
    └── workflows/update-github-cache.yml
```

## Technical Notes

This is a pure static website. It does not use a frontend framework, build step, or server-side application.

The pages are written with plain HTML, CSS, and JavaScript. The homepage reads `github-data.json` to display public GitHub profile data, repositories, recent events, and recent commit counts.

GitHub data is cached through a scheduled GitHub Actions workflow. The workflow runs every 6 hours, fetches public data from the GitHub API, updates `github-data.json`, and commits the file when the data changes.

## Local Preview

You can open `index.html` directly in a browser. For a more accurate local preview with root-relative assets and `fetch("/github-data.json")`, run a static server from the repository root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
http://localhost:8000/zh/
```

## Links

- Website: https://frankguo.com
- GitHub: https://github.com/frankguodev
- X: https://x.com/frankguodev
- LinkedIn: https://www.linkedin.com/in/frankguodev
- Contact: hello@frankguo.com
