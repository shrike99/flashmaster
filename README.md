# FlashMaster

A modern, feature-rich flashcard application built with React. Study smarter with spaced repetition, multiple card types, and a sleek black & white interface.

![FlashMaster](https://img.shields.io/badge/React-18.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎴 **Smart Flashcards**
- **Basic Cards** - Traditional Q&A format
- **Cloze Deletion** - Fill-in-the-blank style cards
- **Image Support** - Add images to questions or answers
- **Markdown Support** - Format your cards with bold, italic, code, and lists

### 🧠 **Spaced Repetition**
- Automatic scheduling based on performance
- Cards reviewed at optimal intervals (3, 7, 15 days)
- Wrong answers reset to 10-minute intervals
- Visual "Due" badges for cards needing review

### ⌨️ **Efficient Study**
- **Keyboard Shortcuts**: Space to flip, ←/→ or 1/2 to mark answers
- **Swipe Gestures**: Drag left for wrong, right for correct
- **Click-to-Zoom**: View card images in full screen
- **Progress Tracking**: Visual progress bar and stats

### 📊 **Statistics**
- Track total cards studied
- Monitor accuracy percentage
- View study history with timestamps
- See due cards at a glance

### 💾 **Data Management**
- **Import/Export** - Backup and share your card decks (JSON format)
- **Clipboard Paste** - Add images directly from clipboard
- **LocalStorage** - All data saved locally in your browser
- **Reset Stats** - Clear study history anytime

### 🎨 **Modern Design**
- Clean black & white aesthetic
- shadcn/ui components
- Dark/Light mode toggle
- Responsive layout

---

## 🚀 Quick Start

### Try It Live
Visit the [live demo](https://yourusername.github.io/flashmaster) to try it instantly!

### Run Locally
1. Clone this repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open `http://localhost:5173`

---

## 📖 How to Use

### Creating Cards

**Basic Cards:**
1. Go to "Add Cards"
2. Enter a question and answer
3. Optionally add an image
4. Click "Save All Cards"

**Cloze Cards:**
1. Switch to "Cloze" tab
2. Write a template with {blanks} in curly braces
3. Example: `The {capital} of France is {Paris}`
4. Save the card

**Adding Images:**
- Click "Add image" button to browse files
- OR paste from clipboard (Ctrl+V / Cmd+V)
- Choose where to show: Question, Answer, or Both

### Studying

**Study Modes:**
- **Study All** - Review entire deck
- **Review Due** - Only cards scheduled for today
- **Retry Wrong** - Focus on mistakes

**Controls:**
- Click card to flip
- Press `Space` or `↑` to flip
- Press `←` or `1` for wrong
- Press `→` or `2` for right
- Drag left/right to swipe

### Import/Export

**Export:**
1. Go to "My Cards"
2. Click "Export" button
3. Save the JSON file

**Import:**
1. Click "Import" button
2. Select a `.json` file
3. Cards merge with existing deck

---

## 🌐 Deploy to GitHub Pages

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**
   ```bash
   # On GitHub.com, create a new repository named "flashmaster"
   ```

2. **Initialize your local project**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/flashmaster.git
   git push -u origin main
   ```

### Step 2: Configure Vite for GitHub Pages

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/flashmaster/', // Replace with your repo name
})
```

### Step 3: Deploy

**Option A: Using GitHub Actions (Recommended)**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v2
```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Push to main branch

**Option B: Manual Deploy with gh-pages**

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

3. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: gh-pages branch

Your app will be live at: `https://yourusername.github.io/flashmaster/`

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Markdown** - Markdown rendering
- **LocalStorage** - Data persistence
- **shadcn/ui** - Design system

---

## 📝 License

MIT License - feel free to use this project however you like!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 💡 Tips

- **Backup regularly** - Export your cards to save your progress
- **Use markdown** - Format cards with `**bold**`, `*italic*`, `` `code` ``
- **Study consistently** - The spaced repetition algorithm works best with daily reviews
- **Paste images** - Screenshot and paste (Ctrl+V) for quick card creation

---

## 🙏 Acknowledgments

Built with inspiration from Anki, Quizlet, and modern flashcard apps.

---

**Happy studying! 🎓**
