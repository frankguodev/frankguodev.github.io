# frankguo.dev

[English](./README.md) | [中文](./README.zh-CN.md)

A quiet personal website for an independent builder working with AI, software, writing, and long-term digital systems.


## Why This Exists

This repository holds the source for [frankguo.dev](https://frankguo.dev).

It is not meant to be a loud portfolio or a fast-moving product surface. It is a small public home: a place to gather identity, work, notes, links, GitHub activity, and the slow traces of ongoing practice.

The site exists because a personal domain can be more than a profile page. It can become a durable place to return to, revise, and let time accumulate.


## Philosophy

The project is built around a few quiet preferences:

- keep the structure simple enough to understand months later
- let the interface feel calm before it feels clever
- make the site useful without making it noisy
- treat design, code, and personal identity as one continuous system
- leave room for iteration instead of pretending the work is finished

There is very little machinery here on purpose. The site is written with plain HTML, CSS, and JavaScript, supported by a small cached GitHub data file and a scheduled workflow.

The intention is not minimalism as decoration. It is minimalism as maintenance.


## Current Direction

The site is currently moving toward a warmer, more editorial identity:

- bilingual pages in English and Chinese
- a default dark theme with a warm black background
- restrained yellow accents
- a refined FG logo system
- GitHub activity shown as a quiet signal of ongoing work
- privacy, disclaimer, manifest, favicon, and crawler metadata kept close to the site itself

The public surface is small, but the system underneath is being shaped carefully.

```text
identity
   |
   +-- homepage
   +-- bilingual copy
   +-- GitHub activity cache
   +-- legal / privacy notes
   +-- favicon and brand assets
   +-- small edits over time
```


## Screenshots

The current visual direction is warm, dark, and restrained.

![Frank Guo site preview](./public/website_home.jpg)

Supporting visual assets live beside the pages rather than behind a build system:

- `hero-bg.jpg` for the light theme
- `hero-bg-dark.jpg` for the dark theme
- `frankguo-fg-logo.svg` as the primary vector logo
- `favicon.svg`, PNG icons, and `favicon.ico` generated from the same logo direction


## Roadmap

This project will likely keep changing in small passes rather than large rewrites.

- refine the homepage rhythm as the body of work grows
- keep the bilingual pages aligned without making them feel mechanically mirrored
- improve the GitHub activity display when there is a clearer story to tell
- add writing or project notes only when they have enough weight to stay
- keep the visual system quiet, warm, and recognizable
- reduce anything that starts to feel decorative without purpose

Some parts will remain imperfect for a while. That is acceptable. A personal site should show signs of being lived with.


## Notes And Learnings

The site is intentionally static.

There is no frontend framework, no build step, and no server application. The homepage reads `github-data.json` for public GitHub profile data, repositories, recent events, and commit counts. A GitHub Actions workflow updates that cache on a schedule.

```text
GitHub API
   -> .github/scripts/update-github-cache.mjs
   -> github-data.json
   -> index.html / zh/index.html
```

This keeps the public site fast and portable while still allowing a small amount of living data to move through it.

The most useful lesson so far: a quiet system still needs strong decisions. Color, spacing, language, metadata, icons, and automation all shape the feeling of the place. None of them are neutral.


## Local Preview

The pages can be opened directly, but a small static server gives a closer preview because the site uses root-relative assets and fetches `github-data.json`.

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
http://localhost:8000/zh/
```


## Repository Shape

```text
.
├── index.html
├── zh/index.html
├── legal.html
├── zh/legal.html
├── github-data.json
├── site.webmanifest
├── public/
│   ├── frankguo-fg-logo.svg
│   ├── hero-bg.jpg
│   ├── hero-bg-dark.jpg
│   └── favicon.svg
├── sitemap.xml
├── robots.txt
└── .github/
    ├── scripts/update-github-cache.mjs
    └── workflows/update-github-cache.yml
```


## Links

- Website: [frankguo.dev](https://frankguo.dev)
- Brand site: [frankguo.com](https://frankguo.com)
- GitHub: [frankguodev](https://github.com/frankguodev)
- X: [frankguodev](https://x.com/frankguodev)
- LinkedIn: [frankguodev](https://www.linkedin.com/in/frankguodev)
