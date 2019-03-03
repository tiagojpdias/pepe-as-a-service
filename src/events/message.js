const { Attachment } = require('discord.js');
const config = require('../../config');
const { getImage, getReservedImage } = require('../utils');
const { allowedTags } = require('../boot');

const retries = new Map();

function handleRetry(author, retryThreshold = config.msgRetryThreshold) {
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
      `_Borda_, fizeste ${retryCount} pedidos nos últimos ${
        config.msgThrottleTime
      } segundos. Vamos evitar _flood_ no canal, OK?`,
    );
  }
}

function throttleUser(author, callback, throttleTime = config.msgThrottleTime) {
  if (retries.has(author.username)) {
    handleRetry(author);
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
      message.author.send(`Exemplo :: _${username} {tag}_`);

      return;
    }

    if (!allowedTags.includes(tag)) {
      message.channel.send(`Tags :: ${allowedTags.join(' , ')}`);

      return;
    }

    try {
      const image = getImage(tag);

      throttleUser(message.author, () => {
        message.channel.send(new Attachment(image));
      });
    } catch (e) {
      console.log(e);
    }
  }
};
