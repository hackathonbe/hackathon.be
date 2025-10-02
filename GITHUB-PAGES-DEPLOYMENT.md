# GitHub Pages Deployment Setup

This guide will help you deploy your Hackathon Belgium website to GitHub Pages using GitHub Actions.

## ✅ What's Been Configured

### 1. Astro Configuration (`site/astro.config.mjs`)

- Set `site` to `https://hackathon.be`
- Ready for custom domain deployment

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

- Automatically builds and deploys on every push to `main` branch
- Can be manually triggered from GitHub Actions tab
- Uses Node.js 20 for building
- Deploys to GitHub Pages automatically

## 🚀 Setup Instructions

### Step 1: Push to GitHub

First, commit and push all changes to your repository:

```bash
cd /workspaces/hackathon.be
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/hackathonbe/hackathon.be`
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (Don't select "Deploy from a branch" - we want Actions)

### Step 3: Configure Custom Domain (Optional but Recommended)

If you want to use `hackathon.be` as your custom domain:

1. In the same **Pages** settings:

   - Under "Custom domain", enter: `hackathon.be`
   - Click **Save**
   - Wait for DNS check (may take a few minutes)

2. **Configure your DNS** at your domain registrar:

   - Add an `A` record pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a `CNAME` record:
     ```
     CNAME: hackathonbe.github.io
     ```
   - For `www.hackathon.be`, add:
     ```
     CNAME www: hackathonbe.github.io
     ```

3. **Enable "Enforce HTTPS"** (after DNS propagation)

### Step 4: Verify Deployment

1. Go to **Actions** tab in your GitHub repository
2. You should see a workflow run starting automatically
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, visit your site:
   - Custom domain: `https://hackathon.be`
   - Or GitHub subdomain: `https://hackathonbe.github.io`

## 🔧 How It Works

### Automatic Deployments

Every time you push to the `main` branch:

1. GitHub Actions automatically triggers
2. Installs Node.js dependencies
3. Builds the Astro site (`npm run build`)
4. Deploys the `dist` folder to GitHub Pages
5. Site is live in 2-3 minutes!

### Manual Deployments

You can also trigger deployments manually:

1. Go to **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select the branch and click **Run workflow**

## 📁 Project Structure

```
hackathon.be/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── site/
│   ├── astro.config.mjs        # Updated with site URL
│   ├── package.json
│   ├── src/
│   ├── public/
│   │   ├── robots.txt          # SEO: Search engine guidance
│   │   ├── sitemap.xml         # SEO: Site structure
│   │   ├── favicon.ico         # Site icon
│   │   └── apple-touch-icon.png
│   └── dist/                   # Built site (generated)
└── README.md
```

## 🐛 Troubleshooting

### Build Fails

**Check the Actions log:**

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Expand the failed step to see error messages

**Common issues:**

- Missing dependencies: Make sure `package-lock.json` is committed
- Build errors: Test locally with `npm run build` in `site/` directory
- Node version mismatch: Workflow uses Node 20

### Site Not Loading

**Check these:**

1. Deployment completed successfully in Actions
2. GitHub Pages is enabled in Settings → Pages
3. Custom domain DNS records are correct (use `dig hackathon.be` to check)
4. Wait 5-10 minutes for DNS propagation

### 404 Errors on Routes

**Check:**

1. Astro is configured for static site generation
2. All routes are in `src/pages/` directory
3. File names match URL structure

### Custom Domain Not Working

**Verify:**

1. DNS records are correct at your registrar
2. DNS has propagated (check with: https://dnschecker.org/)
3. HTTPS is enforced after DNS verification
4. GitHub shows "DNS check successful" in Pages settings

## 🔄 Updating Your Site

To update your live site:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main

# GitHub Actions will automatically deploy!
```

## 📊 Monitoring

### View Deployment Status

- **Actions Tab**: See all deployments and their status
- **Environments**: Check under Settings → Environments → github-pages

### Performance

- Use Lighthouse in Chrome DevTools
- Check PageSpeed Insights: https://pagespeed.web.dev/

### Analytics (Recommended)

Consider adding:

- Google Analytics
- Plausible Analytics
- Simple Analytics

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Pages with "GitHub Actions" source
3. ✅ Configure custom domain (optional)
4. ✅ Wait for first deployment
5. ✅ Verify site is live
6. 🔄 Make updates and push - automatic deployments!

## 📚 Additional Resources

- [Astro GitHub Pages Docs](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domain Configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Your site is ready to deploy! 🚀**

Just push to GitHub and the magic happens automatically!
