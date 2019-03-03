const fs = require('fs');

const tagsFile = 'tags.json';

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

fs.watch(tagsFile, function listener(event, file) {
  switch (event) {
    case 'rename':
    case 'change': {
      reloadTags(file);
      break;
    }
    default: {
      break;
    }
  }
});

reloadTags(tagsFile);

module.exports = {
  getTags() {
    return tags;
  },
};
