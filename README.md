# 🚀 Modern HTML/CSS/JS DevOps Tracker with GitHub Actions CI/CD

An interactive, responsive HTML5 / CSS3 / JavaScript Web Application designed with modern dark glassmorphism styling and automated Continuous Integration (CI) via GitHub Actions.

![GitHub Actions Status](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-brightgreen?logo=github-actions)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)
![Vitest](https://img.shields.io/badge/Testing-Vitest-FCC72B?logo=vitest)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-2ea44f?logo=github)](https://dhruv4777.github.io/practical/)

**Live URL**: [https://dhruv4777.github.io/practical/](https://dhruv4777.github.io/practical/)

---

## 🌟 Key Features

- **Modern Glassmorphism UI**: High-contrast dark theme with animated glowing gradients, responsive layout, and interactive micro-animations.
- **Task & DevOps Management**: Real-time stats computation, task search, filtering (All, Active, Completed), and priority tagging.
- **Automated Testing Suite**: Unit testing built with [Vitest](https://vitest.dev/) and DOM simulation via `happy-dom`.
- **Automated Build Pipeline**: Production bundling powered by [Vite](https://vitejs.dev/).
- **GitHub Actions Integration**: Automated workflow trigger on every `push` and `pull_request` to run tests and build code.

---

## 📁 Project Architecture

```
.
├── .github/
│   └── workflows/
│       └── build-and-test.yml   # GitHub Actions Workflow definition
├── src/
│   ├── taskManager.js           # TaskManager core business logic & state
│   ├── main.js                  # DOM interaction & event handling
│   └── style.css                # CSS Design system & glassmorphism theme
├── test/
│   └── taskManager.test.js      # Vitest unit test suite
├── index.html                   # HTML5 Semantic structure
├── package.json                 # Project dependencies & npm scripts
├── vite.config.js               # Vite & Vitest configuration
└── README.md                    # Project documentation
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Run Unit Tests Locally
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## ⚡ GitHub Actions Workflow Details

The workflow is defined in `.github/workflows/build-and-test.yml`:

- **Triggers**: Executed on `push` to any branch and `pull_request` targeting `main`.
- **Jobs**:
  1. **Build and Test (`build-and-test`)**:
     - Checks out repository source code (`actions/checkout@v4`).
     - Sets up Node.js v20 with npm caching (`actions/setup-node@v4`).
     - Installs dependencies (`npm ci`).
     - Runs Vitest unit tests (`npm test`).
     - Builds production bundle (`npm run build`).
     - Configures and uploads Pages artifact (`actions/upload-pages-artifact@v3`).
  2. **Deploy to GitHub Pages (`deploy`)**:
     - Runs only when commits are pushed/merged into `main`.
     - Deploys the production artifact to GitHub Pages (`actions/deploy-pages@v4`).
     - Exposes the deployment URL at [dhruv4777.github.io/practical](https://dhruv4777.github.io/practical/).
