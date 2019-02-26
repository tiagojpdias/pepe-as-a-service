const { tags } = require('../boot');

function getImage(tag) {
  if (!tag) {
    throw Error('Tag is missing');
  }

  const urls = tags.get(tag);

  if (!urls) {
    throw Error('No images for this tag');
  }

  const index = Math.floor(Math.random() * urls.length);

  return urls[index];
}

module.exports = {
  getImage,
};
