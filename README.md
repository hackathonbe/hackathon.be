# Hackathon Belgium Website

[![Deploy to GitHub Pages](https://github.com/hackathonbe/hackathon.be/actions/workflows/deploy.yml/badge.svg)](https://github.com/hackathonbe/hackathon.be/actions/workflows/deploy.yml)

The official website for Hackathon Belgium - everything about hackathons happening in Belgium.

🌐 **Live Site**: [https://hackathon.be](https://hackathon.be)

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Using Dev Container (Recommended)](#using-dev-container-recommended)
  - [Local Development](#local-development)
- [Development](#development)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [License](#license)

## 🎯 About

Hackathon Belgium is a community-driven platform that:

- 📅 Lists upcoming hackathons across Belgium
- 👥 Connects 5000+ participants from 20+ cities
- 📚 Provides resources for organizers (Hackathon Canvas, studies)
- 🤝 Fosters innovation and entrepreneurship

**Since 2011**, we've supported 150+ hackathon events throughout Belgium!

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Fast, content-focused web framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Deployment**: GitHub Pages with GitHub Actions
- **Dev Environment**: VS Code Dev Containers

## 🚀 Getting Started

### Using Dev Container (Recommended)

The easiest way to contribute is using our pre-configured dev container. Everything you need is already set up!

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hackathonbe/hackathon.be.git
   cd hackathon.be
   ```

2. **Open in VS Code**:

   ```bash
   code .
   ```

3. **Reopen in Container**:

   - VS Code will detect the `.devcontainer` configuration
   - Click **"Reopen in Container"** when prompted
   - Or: Press `F1` → Type "Dev Containers: Reopen in Container"

4. **Wait for setup** (first time only):

   - Container builds automatically
   - Dependencies install via `postCreateCommand`
   - Takes ~2-3 minutes on first run

5. **Start developing**:

   ```bash
   cd site
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

#### What's Included in the Dev Container?

- ✅ Node.js 24 (latest LTS)
- ✅ Git, GitHub CLI (`gh`)
- ✅ ESLint & Prettier (auto-format on save)
- ✅ VS Code extensions pre-installed
- ✅ Ports 3000 & 4321 forwarded
- ✅ All dependencies installed

### Local Development

If you prefer not to use Docker:

#### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn

#### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hackathonbe/hackathon.be.git
   cd hackathon.be
   ```

2. **Install dependencies**:

   ```bash
   cd site
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:4321`

## 💻 Development

### Available Commands

Navigate to the `site/` directory and run:

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start development server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |
| `npm run check`   | Run Astro's type checking                    |
| `npm run format`  | Format code with Prettier                    |
| `npm run lint`    | Lint and fix code with ESLint                |

### Project Structure

```
hackathon.be/
├── .devcontainer/           # Dev container configuration
│   └── devcontainer.json
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment
├── site/                    # Astro project root
│   ├── public/              # Static assets
│   │   ├── robots.txt       # SEO: Search engine rules
│   │   ├── favicon.ico      # Site icon
│   │   ├── apple-touch-icon.png
│   │   └── wp-media/        # Logos and legacy files served as-is
│   ├── src/assets/photos/   # Photos, optimised at build time
│   ├── src/
│   │   ├── components/      # Reusable Astro components
│   │   │   ├── Header.astro
│   │   │   └── EventCard.astro
│   │   ├── content/
│   │   │   └── events/      # One YAML file per hackathon
│   │   ├── content.config.ts # Schema every event file is checked against
│   │   ├── layouts/         # Page layouts
│   │   │   └── Layout.astro # Main layout with SEO
│   │   ├── lib/             # Event helpers (dates, grouping, structured data)
│   │   └── pages/           # File-based routing
│   │       ├── index.astro  # Homepage
│   │       ├── calendar.astro   # Upcoming hackathons
│   │       ├── hackathons/      # All hackathons, one page per event and per city
│   │       ├── sitemap.xml.ts   # SEO: Site structure, generated at build
│   │       └── ...
│   ├── astro.config.mjs     # Astro configuration
│   ├── tailwind.config.cjs  # Tailwind CSS config
│   └── package.json
├── docs/
│   ├── listings.md          # How event listings work
│   └── crawler-sources.md   # Where to look for new hackathons
├── GITHUB-PAGES-DEPLOYMENT.md
├── SEO-IMPROVEMENTS.md
└── README.md                # You are here!
```

### Event Listings

Every hackathon on the site is one YAML file in `site/src/content/events/`. The file name is the
event's address, and the build checks each file before it can go live. To add or correct an event,
see [docs/listings.md](docs/listings.md).

### Making Changes

1. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   - Edit files in `site/src/`
   - Add photos to `site/src/assets/photos/` and use `<Image>` from `astro:assets`, which resizes and compresses them at build time (files in `public/` are served as-is)
   - Test locally with `npm run dev`

3. **Check your code**:

   ```bash
   npm run format    # Format code
   npm run lint      # Check for errors
   npm run build     # Test production build
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

## 🤝 Contributing

We welcome contributions! Here's how to contribute:

### Step-by-Step Contribution Guide

#### 1. Fork the Repository

- Go to [github.com/hackathonbe/hackathon.be](https://github.com/hackathonbe/hackathon.be)
- Click the **Fork** button (top right)
- This creates a copy in your GitHub account

#### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/hackathon.be.git
cd hackathon.be
```

#### 3. Set Up Development Environment

**Option A: Using Dev Container (Recommended)**

```bash
code .
# Click "Reopen in Container" when prompted
cd site
npm run dev
```

**Option B: Local Setup**

```bash
cd site
npm install
npm run dev
```

#### 4. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use meaningful branch names:

- `feature/add-event-calendar`
- `fix/mobile-menu-bug`
- `docs/update-readme`

#### 5. Make Your Changes

- Keep commits small and focused
- Write clear commit messages
- Follow the existing code style
- Test your changes thoroughly

**Commit Message Format**:

```
type: brief description

- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting, missing semi colons, etc
- refactor: code restructuring
- test: adding tests
- chore: maintenance
```

Example:

```bash
git commit -m "feat: add upcoming events section to homepage"
```

#### 6. Keep Your Fork Updated

```bash
# Add upstream remote (only needed once)
git remote add upstream https://github.com/hackathonbe/hackathon.be.git

# Fetch latest changes
git fetch upstream

# Update your main branch
git checkout main
git merge upstream/main

# Rebase your feature branch
git checkout feature/your-feature-name
git rebase main
```

#### 7. Push Your Changes

```bash
git push origin feature/your-feature-name
```

#### 8. Create a Pull Request

1. Go to your fork on GitHub
2. Click **"Compare & pull request"** button
3. Fill in the PR template:
   - **Title**: Clear, descriptive title
   - **Description**:
     - What changes did you make?
     - Why are these changes needed?
     - Screenshots (if UI changes)
     - Closes #issue-number (if applicable)

**Example PR Description**:

```markdown
## Description

Added a new section to display upcoming hackathon events on the homepage.

## Changes

- Created EventCard component
- Updated homepage layout
- Added responsive grid for events
- Styled with Tailwind CSS

## Screenshots

[Add screenshot here]

## Checklist

- [x] Code builds successfully
- [x] Tested on mobile and desktop
- [x] No console errors
- [x] Follows existing code style

Closes #42
```

#### 9. Code Review Process

- Maintainers will review your PR
- Address any requested changes:
  ```bash
  # Make changes
  git add .
  git commit -m "fix: address review comments"
  git push origin feature/your-feature-name
  ```
- Once approved, your PR will be merged! 🎉

### What We're Looking For

✅ **Good PR Examples**:

- Adding new hackathon events to the calendar
- Fixing bugs or broken links
- Improving accessibility
- Adding documentation
- Optimizing performance
- Enhancing mobile responsiveness

❌ **Avoid**:

- Massive PRs changing many files
- Unrelated changes in one PR
- No description or context
- Breaking existing functionality

### First-Time Contributors

Look for issues labeled:

- `good first issue`
- `help wanted`
- `documentation`

These are great starting points!

### Getting Help

- 💬 **Questions?** Open a [Discussion](https://github.com/hackathonbe/hackathon.be/discussions)
- 🐛 **Bug?** Open an [Issue](https://github.com/hackathonbe/hackathon.be/issues)
- 💡 **Feature Idea?** Open an [Issue](https://github.com/hackathonbe/hackathon.be/issues) with the enhancement label

## 🚢 Deployment

The site deploys automatically to GitHub Pages when you push to the `main` branch.

### Automatic Deployment

1. Push to `main` branch
2. GitHub Actions triggers automatically
3. Site builds and deploys
4. Live in ~2-3 minutes at [hackathon.be](https://hackathon.be)

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab on GitHub
2. Select "Deploy to GitHub Pages"
3. Click **Run workflow**
4. Select branch and run

For detailed deployment information, see [GITHUB-PAGES-DEPLOYMENT.md](./GITHUB-PAGES-DEPLOYMENT.md).

## 📄 Additional Documentation

- [GitHub Pages Deployment Guide](./GITHUB-PAGES-DEPLOYMENT.md)
- [SEO Improvements](./site/SEO-IMPROVEMENTS.md)
- [Favicon Setup](./site/FAVICON-SETUP.md)

## 🌟 Features

- ✅ **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, structured data
- ✅ **Fast**: Built with Astro - ships minimal JavaScript
- ✅ **Responsive**: Mobile-first design with Tailwind CSS
- ✅ **Accessible**: Semantic HTML, ARIA labels
- ✅ **Auto-Deploy**: GitHub Actions for CI/CD
- ✅ **Dev-Ready**: Pre-configured dev container

## 📊 Stats

- **150+** hackathon events since 2011
- **5000+** participants
- **20** cities across Belgium
- **400+** Meetup community members

## 🙏 Acknowledgments

- All contributors who have helped improve the site
- The Belgian hackathon community
- Startup Weekend and innovation communities across Belgium

## 📞 Contact

- **Website**: [hackathon.be](https://hackathon.be)
- **Meetup**: [Hackathon Belgium Community](https://www.meetup.com/Hackathon-Belgium)
- **GitHub**: [github.com/hackathonbe](https://github.com/hackathonbe)

## 📝 License

This project is open source. See the repository for license details.

---

**Made with ❤️ by the Belgian hackathon community**

_Let's keep innovating together!_ 🚀
