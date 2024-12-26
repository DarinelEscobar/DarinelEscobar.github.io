# React + Vite + TypeScript + shadcn/ui Template (react-vite-shadcn-ui-template)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Dan5py/react-vite-ui/blob/main/LICENSE)  
**Inspired by**: [Dan5py's React Vite ShadCN UI Template](https://github.com/dan5py/react-vite-shadcn-ui.git)


A React + Vite template powered by shadcn/ui.

## 🎉 Features

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast, opinionated frontend build tool.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS** - A utility-first CSS framework.
- **Tailwind Prettier Plugin** - A Prettier plugin for formatting Tailwind CSS classes.
- **ESLint** - A pluggable linting utility for JavaScript and TypeScript.
- **PostCSS** - A tool for transforming CSS with JavaScript.
- **Autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes.
- **shadcn/ui** - Beautifully designed components that you can copy and paste into your apps.
- **react-router-dom** - A library for declarative routing, enabling seamless navigation and dynamic rendering in your React applications.

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 16 or above)
- pnpm (package manager)

## 🚀 Getting Started

Follow these steps to get started with the react-vite-ui template:

1. Clone the repository:

   ```bash
   git clone https://github.com/DarinelGuillen/react-vite-shadcn-ui-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-vite-shadcn-ui-template
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Test the production build locally
```bash
   pnpm build
   npx gh-pages -d dist #Desply in gp pages branch
   serve dist #Local only
   ```

pnpm deploy


## 📜 Available Scripts

- pnpm dev - Starts the development server.
- pnpm build - Builds the production-ready code.
- pnpm lint - Runs ESLint to analyze and lint the code.
- pnpm preview - Starts the Vite development server in preview mode.

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
react-vite-shadcn-ui-template/
├── node_modules/         # Project dependencies
├── public/               # Static assets (e.g., images, favicons)
├── src/                  # Source code
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point for React
│   ├── vite-env.d.ts     # TypeScript Vite environment declarations
│   ├── assets/           # Assets like images and styles
│   │   ├── images/       # Image assets (e.g., logos, icons)
│   │   │   └── react.svg # Example React logo
│   │   └── styles/       # Global and reusable styles
│   │       └── globals.css
│   ├── components/       # Reusable UI components
│   │   └── ui/           # UI-specific components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       └── count-btn.tsx
│   ├── container/        # Layout and route-specific containers
│   │   └── Routes.tsx    # Handles app routing
│   ├── lib/              # Utility functions and helpers
│   │   └── utils.ts      # General-purpose utilities
│   ├── pages/            # Application pages
│   │   ├── Home/         # Home page components
│   │   │   └── HomePage.tsx
│   │   └── Page2/        # Page2 components
│   │       └── Page2.tsx
├── eslint.config.js      # ESLint configuration file
├── index.html            # HTML entry point
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration

```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
