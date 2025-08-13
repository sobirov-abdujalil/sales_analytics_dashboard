# Deployment Guide

This guide provides step-by-step instructions for deploying the Sales Analytics Dashboard to various platforms.

## 🚀 Quick Deploy

### Netlify (Recommended)

1. **Fork/Clone the repository**
2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select this repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sales_analytics_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Upload to web server**
   - Upload the contents of the `dist` folder to your web server
   - Configure your server to serve `index.html` for all routes (SPA routing)

## 🐛 Troubleshooting

### Build Errors

**Error: Module not found**
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Error: Port already in use**
- Kill the process using the port: `npx kill-port 3000`
- Or use a different port: `npm start -- --port 3001`

**Error: Vite not found**
- Install Vite globally: `npm install -g vite`
- Or use npx: `npx vite build`

### Deployment Issues

**Netlify: Build fails**
- Check build logs in Netlify dashboard
- Ensure Node.js version is set to 18
- Verify build command is `npm run build`
- Check that publish directory is `dist`

**Vercel: Build fails**
- Check build logs in Vercel dashboard
- Ensure framework preset is set to Vite
- Verify build command and output directory

**404 errors on refresh**
- Ensure SPA routing is configured
- Check that all routes redirect to `index.html`

### Performance Issues

**Large bundle size**
- The build is already optimized with code splitting
- Charts and UI libraries are in separate chunks
- Consider lazy loading for additional optimization

**Slow loading**
- Enable gzip compression on your server
- Use a CDN for static assets
- Consider implementing service workers for caching

## 🔒 Security Checklist

- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Environment variables are set
- [ ] API keys are not exposed in client code
- [ ] Content Security Policy is configured

## 📊 Performance Checklist

- [ ] Build size is under 2MB total
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

## 🌐 Environment Variables

Create a `.env` file for local development:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=Sales Analytics Dashboard
VITE_APP_VERSION=0.1.0
```

For production, set these in your deployment platform's environment variables section.

## 📱 Mobile Optimization

The dashboard is already optimized for mobile devices with:
- Responsive design using Tailwind CSS
- Touch-friendly interface
- Optimized loading for mobile networks
- Progressive Web App capabilities

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📞 Support

If you encounter issues:

1. Check the build logs in your deployment platform
2. Review the troubleshooting section above
3. Create an issue in the GitHub repository
4. Check the browser console for client-side errors

## 🎯 Success Metrics

After deployment, verify:

- [ ] All pages load correctly
- [ ] Navigation works without 404 errors
- [ ] Charts and visualizations render properly
- [ ] Mobile responsiveness is working
- [ ] Performance metrics are within acceptable ranges
- [ ] Security headers are properly configured

