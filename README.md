# Jiali Guo's Personal Website

This is the source code for [Jiali Guo](https://www.linkedin.com/in/jialiguodaisy)'s personal website. The site is built using [Handlebars.js](https://handlebarsjs.com/) for templating, and Node.js for static site generation.

## ✨ Features

- Modular Handlebars templates and partials
- JSON-driven dynamic content (publications, social links, etc.)
- Clean semantic HTML
- Bootstrap 5, Font Awesome, Google Fonts are used for style
- Easy local development and static site build
- Outputs to `/docs` for GitHub Pages hosting

## 📁 Project Structure

```
├── build.js                # Static site generator script
├── data/                   # JSON files for dynamic content
│   └── socialLinks.json
│   └── publications.json
├── templates/
│   ├── layout.hbs          # Main HTML layout
│   ├── index.hbs           # Homepage template
│   ├── contact.hbs         # Contact page template
│   ├── bio.hbs             # Bio page template
│   ├── cv.hbs              # CV page template
│   ├── publications.hbs    # Publications page template
│   ├── fun-facts.hbs       # Fun Facts page template
│   └── partials/           # Reusable components (e.g. nav, social links)
├── docs/                   # Output folder (for GitHub Pages)
└── package.json
```

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/jialiguo511/jiali-website.git
cd jiali-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Site

```bash
node build.js
```

or

```bash
npm run build
```

The site will be generated into the `docs/` folder.

### 4. Serve Locally (Optional)

You can use any static server (like `serve` or `http-server`) to view it locally:

```bash
npx serve docs
```

or

```bash
npm run dev
```

## 🧠 Customizing

- **Templates** are in `templates/`
- **Partials** go in `templates/partials/`
- **Data** lives in `data/` and is injected into templates

The `build.js` script controls how pages are compiled.

## 📦 Deployment

This site is configured to be hosted using **GitHub Pages**. Make sure your repo's settings are configured to publish from the `docs/` directory.

## 📝 License

This project is for personal and academic use only. Please contact [Jiali Guo](mailto:your.email@example.com) for permissions.