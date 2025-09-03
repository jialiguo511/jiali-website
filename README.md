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

or (preferred)

```bash
npm run build
```

The site will be generated into the `docs/` folder.

### 4. Serve Locally (Optional)

You can use any static server (like `serve` or `http-server`) to view it locally:

```bash
npx serve docs
```

or (preferred)

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

This project is for personal and academic use only. Please contact [Jiali Guo](jialiguo.com/contact) for permissions.



## Notes

I. Images, posters, pdf files are saved in `assets` sub-folders.

II. Relationship in json files: The publication section on the CV page is data driven by the publications.json. 
In other words, the right way to update the publication section of the CV is to update the `publications.json`. 
Only update publications.json once and all publication related content will get automatically refreshed.

However, other json files are not related.


## File structure

.json file: editable 
After editing the .json file, run `npm run build`; then `npm run dev`
Once run dev is up and running (looks like the terminal is "busy"), your HTTP (web) server stays running and stays alive.
This is when you are able to access the website (via the web server) through the address and port in your browser,
typically localhost:8080 for the development server.

Update CV PDF: Should the hard copy of the CV be updated, please replace the cv.pdf file in /docs/assets/cv.pdf. 
This is the only step required to update the CV.

/docs/assets is where all static files are stored, including poster image files, cv.pdf, and all sorts of pdfs.
A good practice is to keep files organized in folders that are parallel to the structure of the site, so that things are aligned and not easily mixed up.

/templates is useful only when you are editing content directly on these pages: bio.hbs, contact.hbs (but not social links. Social links has its own json file), fun-facts.hbs. 
The other files should in principle not be touched.

When you are lost, in terms of where to find the source file for your content, please use global search and match by the keyword of your interest to locate the source. 
Typically it is very safe to edit just the plain text, whether it is nested in a JSON or is part of a HTML based template.
