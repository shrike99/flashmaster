# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying FlashMaster to GitHub Pages step by step.

---

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js installed (v18 or higher)

---

## 🔧 Step-by-Step Instructions

### 1️⃣ Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Enter repository name: `flashmaster` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README (we already have one)
6. Click **"Create repository"**

---

### 2️⃣ Prepare Your Local Files

1. **Open terminal/command prompt** in the folder containing all the FlashMaster files

2. **Update `vite.config.js`** - Change the base URL to match your repo name:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/flashmaster/', // Change 'flashmaster' to YOUR repository name
   })
   ```

3. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

4. **Add all files**:
   ```bash
   git add .
   ```

5. **Create first commit**:
   ```bash
   git commit -m "Initial commit - FlashMaster v1.0"
   ```

---

### 3️⃣ Connect to GitHub

1. **Link your local repository to GitHub** (replace `yourusername` and `flashmaster`):
   ```bash
   git remote add origin https://github.com/yourusername/flashmaster.git
   ```

2. **Rename branch to main**:
   ```bash
   git branch -M main
   ```

3. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

---

### 4️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab (top right)
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Source: **GitHub Actions**
5. Click **"Save"**

---

### 5️⃣ Automatic Deployment

The GitHub Action will automatically:
1. Detect your push to the `main` branch
2. Install dependencies
3. Build the project
4. Deploy to GitHub Pages

**Wait 1-2 minutes**, then your site will be live at:
```
https://yourusername.github.io/flashmaster/
```

---

## ✅ Verify Deployment

1. Go to **Actions** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for the green checkmark ✓
4. Visit your site URL!

---

## 🔄 Making Updates

Every time you make changes:

```bash
# Make your changes to the code
git add .
git commit -m "Description of changes"
git push
```

GitHub Actions will automatically rebuild and deploy! 🎉

---

## 🐛 Troubleshooting

### **Site shows 404 error**
- Check that `base` in `vite.config.js` matches your repository name
- Make sure it ends with a `/`
- Example: `base: '/flashmaster/'`

### **Workflow fails**
- Check the Actions tab for error messages
- Make sure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### **Changes not showing**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Wait a few minutes for deployment to complete

### **"Permission denied" error**
- Go to Settings → Actions → General
- Under "Workflow permissions", select "Read and write permissions"
- Click Save

---

## 📦 Alternative: Manual Deployment (gh-pages)

If you prefer manual deployment:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy manually**:
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** → **/ (root)**

---

## 🎨 Custom Domain (Optional)

1. Buy a domain (e.g., from Namecheap, Google Domains)
2. In your repo: Settings → Pages → Custom domain
3. Enter your domain (e.g., `flashmaster.com`)
4. Update DNS settings at your domain registrar:
   ```
   CNAME record: www → yourusername.github.io
   A records:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

---

## 📝 File Structure

Your project should look like this:

```
flashmaster/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment workflow
├── src/
│   ├── App.jsx                 # Main application
│   └── main.jsx                # Entry point
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Build configuration
├── README.md                   # Project documentation
├── DEPLOYMENT.md               # This file
└── LICENSE                     # MIT License
```

---

## 🎉 Success!

Your FlashMaster app is now live on the internet! Share the link with friends and start studying! 📚✨

**Live URL**: `https://yourusername.github.io/flashmaster/`

---

## 💡 Tips

- **Backup your work**: Always commit and push regularly
- **Test locally first**: Run `npm run dev` before deploying
- **Check the build**: Run `npm run build` to test the production build
- **Monitor Actions**: Check the Actions tab to see deployment status

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or open an issue in the repository.
