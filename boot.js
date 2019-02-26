require('dotenv').config();
const fs = require('fs');

const file = fs.readFileSync('tags.json', 'utf8');
const parsedFile = JSON.parse(file);
const tags = new Map(Object.entries(parsedFile));

module.exports.tags = tags;
