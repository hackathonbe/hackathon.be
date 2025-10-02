# Contributing to Hackathon Belgium

First off, thank you for considering contributing to Hackathon Belgium! 🎉

This document provides guidelines and instructions for contributing to the project.

## 📜 Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community

## 🚀 Quick Start

### 1. Set Up Your Development Environment

**Using Dev Container (Recommended):**

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/hackathon.be.git
cd hackathon.be

# Open in VS Code
code .

# Reopen in Container when prompted
# Wait for setup to complete
cd site
npm run dev
```

**Local Setup:**

```bash
git clone https://github.com/YOUR-USERNAME/hackathon.be.git
cd hackathon.be/site
npm install
npm run dev
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes & Test

```bash
# Run dev server
npm run dev

# Check your changes at http://localhost:4321

# Format and lint
npm run format
npm run lint

# Test production build
npm run build
```

### 4. Submit Pull Request

See detailed instructions in [Pull Request Process](#pull-request-process).

## 🎯 Ways to Contribute

### 🐛 Report Bugs

Found a bug? Help us fix it!

1. Check if the bug was already reported in [Issues](https://github.com/hackathonbe/hackathon.be/issues)
2. If not, [create a new issue](https://github.com/hackathonbe/hackathon.be/issues/new)
3. Use a clear title and description
4. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser/OS information

**Example Bug Report:**

```markdown
**Title**: Mobile menu doesn't close on navigation

**Description**:
When clicking a menu item on mobile, the menu remains open.

**Steps to Reproduce**:

1. Open site on mobile (or resize browser to <768px)
2. Click hamburger menu
3. Click "Calendar" link
4. Menu stays open

**Expected**: Menu should close after navigation
**Actual**: Menu remains open

**Environment**:

- Browser: Safari 17.0
- OS: iOS 17
- Device: iPhone 14

**Screenshot**: [attach screenshot]
```

### ✨ Suggest Features

Have an idea? We'd love to hear it!

1. Check [existing issues](https://github.com/hackathonbe/hackathon.be/issues?q=is%3Aissue+label%3Aenhancement)
2. [Create a new issue](https://github.com/hackathonbe/hackathon.be/issues/new) with `enhancement` label
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Why this would benefit users
   - Any alternatives you've considered

### 📝 Improve Documentation

- Fix typos or clarify instructions
- Add examples or screenshots
- Update outdated information
- Translate documentation

### 💻 Submit Code

See [Development Guidelines](#development-guidelines) below.

## 🔧 Development Guidelines

### Code Style

- **JavaScript/TypeScript**: Follow existing patterns
- **Astro Components**: Use `.astro` format
- **CSS**: Use Tailwind utility classes when possible
- **Formatting**: Prettier runs automatically on save (in dev container)
- **Linting**: ESLint checks for common issues

### File Organization

```
site/src/
├── components/       # Reusable components
│   └── Header.astro
├── layouts/         # Page layouts
│   └── Layout.astro
└── pages/          # Routes (file-based routing)
    ├── index.astro     # / route
    ├── calendar.astro  # /calendar route
    └── posts/          # /posts/* routes
```

### Component Guidelines

**Create reusable components:**

```astro
---
// src/components/EventCard.astro
export interface Props {
  title: string;
  date: string;
  location: string;
}

const { title, date, location } = Astro.props;
---

<div class="event-card bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold mb-2">{title}</h3>
  <p class="text-gray-600">{date}</p>
  <p class="text-gray-600">{location}</p>
</div>
```

**Use in pages:**

```astro
---
import EventCard from '../components/EventCard.astro';
---

<EventCard
  title="Hack the Future"
  date="October 15, 2025"
  location="Brussels"
/>
```

### Styling Guidelines

**Use Tailwind classes:**

```astro
<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-6">Title</h1>
  <p class="text-lg text-gray-700">Content</p>
</div>
```

**For complex components, use Tailwind's @apply:**

```css
.event-card {
  @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
}
```

### SEO Best Practices

Always include proper meta tags:

```astro
---
import Layout from '../layouts/Layout.astro';
const title = "Page Title";
const description = "Page description for SEO and social sharing";
---

<Layout title={title} description={description}>
  <!-- Page content -->
</Layout>
```

### Accessibility

- Use semantic HTML (`<nav>`, `<main>`, `<article>`, etc.)
- Include `alt` text for images
- Use proper heading hierarchy (h1 → h2 → h3)
- Add ARIA labels for icon-only buttons
- Ensure sufficient color contrast

**Example:**

```astro
<button
  class="menu-button"
  aria-label="Open navigation menu"
  aria-expanded="false"
>
  <svg><!-- icon --></svg>
</button>
```

### Testing Your Changes

Before submitting:

1. **Development server**: `npm run dev`

   - Test functionality manually
   - Check responsive design (mobile, tablet, desktop)
   - Test in different browsers

2. **Linting**: `npm run lint`

   - Fix any ESLint errors

3. **Formatting**: `npm run format`

   - Ensure consistent code style

4. **Production build**: `npm run build`

   - Verify build succeeds
   - Check for build warnings
   - Test preview: `npm run preview`

5. **Check console**: Open browser DevTools
   - No JavaScript errors
   - No 404s for assets

## 📋 Pull Request Process

### Before Submitting

- [ ] Branch created from latest `main`
- [ ] Code follows style guidelines
- [ ] All tests pass (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] Tested manually in browser
- [ ] Commit messages are clear

### Creating the PR

1. **Push your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub**:

   - Go to the repository
   - Click "Compare & pull request"
   - Fill in the template

3. **PR Title Format**:

   ```
   type: brief description
   ```

   Types:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation
   - `style`: Formatting, styling
   - `refactor`: Code restructuring
   - `perf`: Performance improvement
   - `test`: Adding tests
   - `chore`: Maintenance

   Examples:

   - `feat: add event filtering to calendar page`
   - `fix: mobile menu closing issue`
   - `docs: update contributing guidelines`

4. **PR Description Template**:

   ```markdown
   ## Description

   Brief description of what this PR does.

   ## Changes

   - List of specific changes
   - Be as detailed as needed

   ## Type of Change

   - [ ] Bug fix (non-breaking change which fixes an issue)
   - [ ] New feature (non-breaking change which adds functionality)
   - [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
   - [ ] Documentation update

   ## Screenshots (if applicable)

   Add screenshots to show visual changes.

   ## Checklist

   - [ ] Code builds successfully (`npm run build`)
   - [ ] Linting passes (`npm run lint`)
   - [ ] Code formatted (`npm run format`)
   - [ ] Tested on different browsers
   - [ ] Tested on mobile
   - [ ] No console errors
   - [ ] Documentation updated (if needed)

   ## Related Issues

   Closes #issue-number
   ```

### Review Process

1. **Automated Checks**: GitHub Actions will run automatically

   - Build must succeed
   - No linting errors

2. **Code Review**: Maintainers will review your PR

   - May request changes
   - May ask questions
   - Aim to review within 3-5 days

3. **Addressing Feedback**:

   ```bash
   # Make requested changes
   git add .
   git commit -m "fix: address review comments"
   git push origin feature/your-feature-name
   ```

   - No need to create new PR
   - Changes update automatically

4. **Approval & Merge**:
   - Once approved, maintainers will merge
   - Your changes will deploy automatically
   - PR will be closed
   - You'll be added to contributors! 🎉

### After Merge

- Delete your feature branch (GitHub offers this)
- Update your local repository:
  ```bash
  git checkout main
  git pull upstream main
  ```

## 🏷️ Issue Labels

| Label              | Description                   |
| ------------------ | ----------------------------- |
| `bug`              | Something isn't working       |
| `enhancement`      | New feature request           |
| `documentation`    | Documentation improvements    |
| `good first issue` | Good for newcomers            |
| `help wanted`      | Extra attention needed        |
| `question`         | Further information requested |
| `wontfix`          | Will not be worked on         |
| `duplicate`        | Already exists                |

## 🎓 Learning Resources

### Astro

- [Astro Documentation](https://docs.astro.build/)
- [Astro Tutorial](https://docs.astro.build/en/tutorial/0-introduction/)

### Tailwind CSS

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Playground](https://play.tailwindcss.com/)

### Git & GitHub

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)

### Dev Containers

- [Dev Containers Tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial)

## 💬 Communication

### Questions?

- 💭 **General Questions**: [Discussions](https://github.com/hackathonbe/hackathon.be/discussions)
- 🐛 **Bug Reports**: [Issues](https://github.com/hackathonbe/hackathon.be/issues)
- 💡 **Feature Requests**: [Issues](https://github.com/hackathonbe/hackathon.be/issues)

### Response Times

- **Issues**: Reviewed within 3-5 days
- **PRs**: Initial review within 3-5 days
- **Discussions**: Ongoing, community-driven

## ✅ Checklist for Maintainers

When reviewing PRs:

- [ ] Code quality meets standards
- [ ] Tests pass
- [ ] No breaking changes (or properly documented)
- [ ] Documentation updated if needed
- [ ] PR description is clear
- [ ] Commits are clean and logical
- [ ] Branch is up-to-date with main

## 🎉 Recognition

All contributors will be:

- Listed in the repository's contributors
- Acknowledged in release notes (for significant contributions)
- Thanked publicly on our website (with permission)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Hackathon Belgium!** 🚀

Together, we're building something amazing for the Belgian innovation community! 💪
