const { tags } = require('../boot');

function randomImage(urls) {
  if (!urls) {
    throw Error('No images for this tag');
  }

  const index = Math.floor(Math.random() * urls.length);

  return urls[index];
}

function getImage(tag) {
  const urls = tags.get(tag);

  return randomImage(urls);
}

function getReservedImage(tag) {
  const urls = tags.get('__reserved')[tag];

  return randomImage(urls);
}

module.exports = {
  getImage,
  getReservedImage,
};
