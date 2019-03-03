const fs = require('fs');

let tags = new Map();

function reloadTags() {
  const file = fs.readFileSync('tags.json', 'utf8');
  const parsedFile = JSON.parse(file);

  tags = Object.entries(parsedFile).reduce((newMap, [key, value]) => {
    newMap.set(key, value);
    return newMap;
  }, new Map());
}

reloadTags();

setInterval(reloadTags, 10 * 1000);

function getTags() {
  return tags;
}

module.exports = {
  getTags,
};
