const { Attachment } = require('discord.js');
const { getImage, getReservedImage } = require('../utils');
const { allowedTags } = require('../boot');

const jail = new Set();
function throttleUser(author, cb, time = process.env.MSG_THROTTLE_TIME || 30) {
  if (jail.has(author.username)) {
    return;
  }

  setInterval(() => {
    jail.delete(author.username);
  }, time * 1000);

  jail.add(author.username);
  cb();
}

module.exports = async message => {
  if (message.author.bot) {
    return;
  }

  const botUsername = message.client.user.toString();

  if (message.content.startsWith(botUsername)) {
    const [username, tag, ...gibberish] = message.content.trim().split(' ');

    if (gibberish.length > 0) {
      const attachment = new Attachment(getReservedImage('angryPepe'));
      message.channel.send('**MANO SO UMA TAG DE CADA VEZ NE!!**', {
        files: [attachment],
      });

      return;
    }

    if (!tag) {
      message.channel.send(`Exemplo :: _${username} {tag}_`);

      return;
    }

    if (!allowedTags.includes(tag)) {
      message.channel.send(`Tags :: ${allowedTags.join(' , ')}`);

      return;
    }

    try {
      const image = getImage(tag);

      throttleUser(message.author, () => {
        const attachment = new Attachment(image);

        message.channel.send(attachment);
      });
    } catch (e) {
      console.log(e);
    }
  }
};
