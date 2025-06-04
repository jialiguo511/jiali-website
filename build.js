const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

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
  { name: 'index', context: { ...baseContext, ...JSON.parse(fs.readFileSync('data/experiences.json', 'utf8')) } },
  { name: 'works', context: { ...baseContext, title: 'Works' } },
  { name: 'bio', context: { ...baseContext, title: 'Bio' } },
  { name: 'cv', context: { ...baseContext, title: 'CV' } },
  { name: 'contact', context: { ...baseContext, title: 'Contact' } },
  { name: 'fun-facts', context: { ...baseContext, title: 'Fun Facts' } }
];

// Build output directory
const dist = 'dist';
fs.ensureDirSync(dist);

// Render each page
pages.forEach(({ name, context }) => {
  const pageTemplate = fs.readFileSync(`templates/${name}.hbs`, 'utf8');
  const body = Handlebars.compile(pageTemplate)(context);
  const fullHtml = layout({ ...context, body });
  fs.writeFileSync(`${dist}/${name}.html`, fullHtml);
});

console.log('Site built successfully into /dist');
