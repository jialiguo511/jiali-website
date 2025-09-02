// helpers/ordinal-sup.js
const Handlebars = require('handlebars');

function suffixFor(n) {
  const num = Number(n);
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

Handlebars.registerHelper('ordinal-sup', function (text) {
  if (!text) return '';
  const str = String(text);
  return new Handlebars.SafeString(
    str.replace(/\b(\d+)(st|nd|rd|th)\b/gi, (_, num) => {
      const correct = suffixFor(num);
      return `${num}<sup>${correct}</sup>`;
    })
  );
});

module.exports = {}; // so you can require this file in build.js