const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

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

// Register partials
const partialsDir = path.join(__dirname, 'templates/partials');
fs.readdirSync(partialsDir).forEach(file => {
  const name = path.basename(file, '.hbs');
  const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
  Handlebars.registerPartial(name, content);
});

// Load layout
const layout = Handlebars.compile(fs.readFileSync('templates/layout.hbs', 'utf8'));

const baseContext = { year: new Date().getFullYear() };

// Pages and optional context
const pages = [
  { name: 'index', context: { ...baseContext, title: 'Jiali Guo\'s Website' } },
  { name: 'bio', context: { ...baseContext, title: 'Jiali - Bio' } },
  { name: 'cv', context: { ...baseContext, title: 'Jiali - CV' } },
  { 
    name: 'publications', 
    context: {
      ...baseContext,
      title: 'Jiali - Publications',
      publications: JSON.parse(fs.readFileSync('data/publications.json', 'utf8'))
    }
  },
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
