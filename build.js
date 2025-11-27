const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');
require('./helpers/ordinal-sup');

// Register 'eq' helper for value comparisons in templates
// Supports both inline and block usage
Handlebars.registerHelper('eq', function(a, b, options) {
  // Block helper usage: {{#eq a b}}...{{else}}...{{/eq}}
  if (options && typeof options.fn === 'function') {
    return (a === b) ? options.fn(this) : options.inverse(this);
  }
  // Inline usage: {{#if (eq a b)}}
  return a === b;
});

// Logical OR helper for combining conditions
Handlebars.registerHelper('or', function(...args) {
  const options = args.pop();
  return args.some(Boolean) ? options.fn ? options.fn(this) : true : options.inverse ? options.inverse(this) : false;
});

// Register partials
const partialsDir = path.join(__dirname, 'templates/partials');
fs.readdirSync(partialsDir).forEach(file => {
  const name = path.basename(file, '.hbs');
  const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
  Handlebars.registerPartial(name, content);
});

// Load layout, social links, and publications
const layout = Handlebars.compile(fs.readFileSync('templates/layout.hbs', 'utf8'));
const socialLinks = JSON.parse(fs.readFileSync('data/socialLinks.json', 'utf8'));
const publications = JSON.parse(fs.readFileSync('data/publications.json', 'utf8'));
const conferences = JSON.parse(fs.readFileSync('data/conferences.json', 'utf8'));
const projects = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

// Attach to baseContext
const baseContext = { year: new Date().getFullYear(), socialLinks, publications, conferences, projects };

// Pages and optional context
const pages = [
  { name: 'index', context: { ...baseContext, title: 'Jiali Guo\'s Website' } },
  { name: 'bio', context: { ...baseContext, title: 'Jiali - Bio' } },
  { name: 'cv', context: { ...baseContext, ...JSON.parse(fs.readFileSync('data/cv.json', 'utf8')) } },
  { name: 'projects', context: { ...baseContext, title: 'Jiali - Projects' } },
  { name: 'conferences', context: { ...baseContext, title: 'Jiali - Conferences' } },
  { name: 'publications', context: { ...baseContext, title: 'Jiali - Publications' } },
  { name: 'contact', context: { ...baseContext, title: 'Jiali - Contact' } },
  { name: 'fun-facts', context: { ...baseContext, title: 'Jiali - Fun Facts' } }
];

// Build output directory
const dist = 'docs';
fs.ensureDirSync(dist);

// Render each page
pages.forEach(({ name, context }) => {
  const pageTemplate = fs.readFileSync(`templates/${name}.hbs`, 'utf8');
  const body = Handlebars.compile(pageTemplate)(context);
  const fullHtml = layout({ ...context, body });
  fs.writeFileSync(`${dist}/${name}.html`, fullHtml);
});

console.log('Site built successfully into /docs');
