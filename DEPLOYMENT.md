# Deployment Guide

## Deploying to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to deploy.

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

## Environment Variables (If Needed)

If you need to add environment variables in the future:

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

## Build Configuration

The project includes `vercel.json` with optimal settings:
- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Install command: `npm install`

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Node 18+)
- Check build logs on Vercel dashboard

### Images Not Loading
- Ensure image domains are added to `next.config.js`
- Use Next.js Image component for optimization

### Styling Issues
- Verify Tailwind CSS is properly configured
- Check `tailwind.config.js` content paths

## Post-Deployment

After deployment:
- Your site will have a `.vercel.app` domain
- You can add a custom domain in project settings
- All commits to main branch auto-deploy
- Preview deployments created for PRs

---

For more help, visit [Vercel Documentation](https://vercel.com/docs)
