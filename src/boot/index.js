const fs = require('fs');

let tags = new Map();

function reloadTags() {
  const currentDate = new Date(Date.now()).toLocaleString('PT');

  const file = fs.readFileSync('tags.json', 'utf8');
  const parsedFile = JSON.parse(file);

  tags = Object.entries(parsedFile).reduce((newMap, [key, value]) => {
    newMap.set(key, value);
    return newMap;
  }, new Map());


  console.log(`INFO :: Tags map recreated @ ${currentDate}`);
}

fs.watch('tags.json', function listener(event) {
  if (event === 'change') {
    reloadTags();
  }
});

reloadTags();

function getTags() {
  return tags;
}

module.exports = {
  getTags,
};
