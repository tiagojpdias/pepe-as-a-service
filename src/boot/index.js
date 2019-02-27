require('dotenv').config();
const fs = require('fs');

const file = fs.readFileSync('tags.json', 'utf8');
const parsedFile = JSON.parse(file);
const tags = new Map(Object.entries(parsedFile));

const availableTags = [...tags.keys()];
const allowedTags = availableTags.filter(tag => tag !== '__reserved');

module.exports = {
  allowedTags,
  availableTags,
  tags,
};
