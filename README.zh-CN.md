# frankguo.dev

[English](./README.md) | [中文](./README.zh-CN.md)

一个安静的个人网站，记录一位独立构建者围绕 AI、软件、写作与长期数字系统所做的持续实践。


## 它为什么存在

这个仓库存放的是 [frankguo.dev](https://frankguo.dev) 的源码。

它不是一个喧闹的作品集，也不是一个快速包装出来的产品展示页。它更像一个小型的公共居所：用来放置身份、作品、笔记、链接、GitHub 活动，以及持续实践留下的慢痕迹。

个人域名不只是一个资料页。它也可以成为一个能不断回来修改、沉淀时间、慢慢变得更清晰的地方。


## 项目哲学

这个项目围绕几条安静的偏好展开：

- 结构要简单到几个月后还能轻松理解
- 界面先保持平静，再谈聪明
- 让网站有用，但不变得吵闹
- 把设计、代码和个人身份视为同一个连续系统
- 为迭代留下空间，而不是假装一切已经完成

这里刻意保留了很少的工程机械。网站由纯 HTML、CSS 和 JavaScript 编写，配合一个小型 GitHub 数据缓存文件，以及一个定时更新的 GitHub Actions 工作流。

这里的极简不是装饰，而是为了长期维护。


## 当前方向

网站目前正在向一种更温暖、更编辑化的个人身份系统靠近：

- 英文和中文双语页面
- 默认暗色主题，使用温暖的黑色背景
- 克制的黄色点缀
- 经过打磨的 FG 标识系统
- 用 GitHub 活动作为持续工作的安静信号
- 隐私、免责声明、manifest、favicon 和爬虫元数据都和站点放在一起维护

公开表面很小，但下面的系统在被认真塑形。

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


## 截图

当前视觉方向是温暖、暗色、克制的。

![Frank Guo site preview](./public/website_home.jpg)

视觉资源直接和页面放在一起，而不是藏在复杂的构建系统后面：

- `hero-bg.jpg` 用于浅色主题
- `hero-bg-dark.jpg` 用于暗色主题
- `frankguo-fg-logo.svg` 是主要矢量标识
- `favicon.svg`、PNG 图标和 `favicon.ico` 来自同一套标识方向


## 路线图

这个项目更可能通过许多小步修改继续变化，而不是突然大规模重写。

- 随着作品积累，继续调整首页的阅读节奏
- 让中英文页面保持一致，但不变成机械镜像
- 当 GitHub 活动有更清晰的表达价值时，继续改善展示方式
- 只在内容有足够重量时，再加入写作或项目笔记
- 保持视觉系统安静、温暖、可识别
- 移除那些开始变成无目的装饰的东西

有些地方会在一段时间里保持不完美。这是可以接受的。一个个人网站应该看得出被长期使用和照料过。


## 笔记与学习

这个网站刻意保持静态。

它没有前端框架，没有构建步骤，也没有服务端应用。首页读取 `github-data.json`，展示公开 GitHub 资料、仓库、最近事件和提交统计。GitHub Actions 会按计划更新这份缓存。

```text
GitHub API
   -> .github/scripts/update-github-cache.mjs
   -> github-data.json
   -> index.html / zh/index.html
```

这样可以让公开站点保持快速、可迁移，同时又保留一点会流动的数据。

到目前为止最有用的体会是：安静的系统也需要强判断。颜色、间距、语言、元数据、图标和自动化，都会塑造这个地方的感受。它们都不是中性的。


## 本地预览

页面可以直接打开，但因为站点使用根路径资源，并会读取 `github-data.json`，用一个小型静态服务器预览会更接近线上效果。

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
http://localhost:8000/zh/
```


## 仓库结构

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


## 链接

- Website: [frankguo.dev](https://frankguo.dev)
- Brand site: [frankguo.com](https://frankguo.com)
- GitHub: [frankguodev](https://github.com/frankguodev)
- X: [frankguodev](https://x.com/frankguodev)
- LinkedIn: [frankguodev](https://www.linkedin.com/in/frankguodev)
