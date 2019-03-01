const { Attachment } = require('discord.js');
const { msgThrottleTime, msgRetryThreshold } = require('../../config');
const { getImage, getReservedImage } = require('../utils');
const { allowedTags } = require('../boot');

const retries = new Map();

function throttleUser(
  author,
  callback,
  throttleTime = msgThrottleTime,
  retryThreshold = msgRetryThreshold,
) {
  if (retries.has(author.username)) {
    const retryCount = retries.get(author.username) + 1;

    retries.set(author.username, retryCount);

    if (retryCount >= retryThreshold * 2) {
      const attachment = new Attachment(getReservedImage('angryPepe'));

      author.send('**FODA-SE PÁ, NÃO PERCEBESTE A MENSAGEM CRL?!?!**', {
        files: [attachment],
      });

      return;
    }

    if (retryCount >= retryThreshold) {
      author.send(
        `_Borda_, fizeste ${retryCount} pedidos nos últimos ${throttleTime} segundos. Vamos evitar _flood_ no canal, OK?`,
      );

      return;
    }

    return;
  }

  setInterval(() => {
    retries.delete(author.username);
  }, throttleTime * 1000);

  retries.set(author.username, 1);

  callback();
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

      message.channel.send('**EI _BORDA_, UMA TAG DE CADA VEZ, OK?!?!**', {
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
