const fs = require('fs');

let tags = new Map();

function reloadTags(file) {
  const currentDate = new Date(Date.now()).toLocaleString('PT');

  try {
    const readFile = fs.readFileSync(file, 'utf8');
    const parsedFile = JSON.parse(readFile);

    tags = Object.entries(parsedFile).reduce((newMap, [key, value]) => {
      newMap.set(key, value);
      return newMap;
    }, new Map());

    console.log(`INFO :: Tags map recreated @ ${currentDate}`);
  } catch (e) {
    console.error(e);
  }
}

fs.watch('tags.json', function listener(event, file) {
  if (event === 'change') {
    reloadTags(file);
  }
});

reloadTags();

module.exports = {
  getTags() {
    return tags;
  },
};
