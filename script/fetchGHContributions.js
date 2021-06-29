const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const user = 'pissang';

const url = `https://github.com/${user}`;
console.log(url);
// JSON.stringify(Array.prototype.map.call(document.querySelectorAll('.js-yearly-contributions rect.ContributionCalendar-day'), (rect) => [rect.getAttribute('data-date'), +rect.getAttribute('data-count'), +rect.getAttribute('data-level')]).filter(a => !!a[1]))
fetch(url)
  .then((response) => response.text())
  .then((body) => {
    console.log(body);
    // Parse github profile page
    const $ = cheerio.load(body);
    const data = $('.js-yearly-contributions rect.ContributionCalendar-day')
      .map((rect) => {
        // Parse contributions value
        const value = $(rect).data('count');

        // Parse contributions date
        const date = $(rect).data('date');
        const level = $(rect).data('level');

        return [date, value, level];
      })
      .filter((a) => !!a[1]);

    fs.writeFileSync(
      path.resolve(__dirname, '../src/scenes/data/gh-contributions.json'),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  });
