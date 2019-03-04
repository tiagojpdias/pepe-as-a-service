const { Attachment } = require('discord.js');
const config = require('../../config');
const { getImage, getReservedImage } = require('../utils');
const { getTags } = require('../boot');

const retries = new Map();

function handleRetry(author, retryThreshold = config('bot.msgRetryThreshold')) {
  const retryCount = retries.get(author.id) + 1;

  retries.set(author.id, retryCount);

  if (retryCount >= retryThreshold * 2) {
    const attachment = new Attachment(getReservedImage('angryPepe'));

    author.send('**FODA-SE PÁ, NÃO PERCEBESTE A MENSAGEM CRL?!?!**', {
      files: [attachment],
    });

    return;
  }

  if (retryCount >= retryThreshold) {
    author.send(
      `_Borda_, fizeste ${retryCount} pedidos nos últimos ${config(
        'bot.msgThrottleTime',
      )} segundos. Vamos evitar _flood_ no canal, OK?`,
    );
  }
}

function throttleUser(
  author,
  callback,
  throttleTime = config('bot.msgThrottleTime'),
) {
  if (retries.has(author.id)) {
    handleRetry(author);
    throw Error('Preventing flood.');
  }

  setInterval(() => {
    retries.delete(author.id);
  }, throttleTime * 1000);

  retries.set(author.id, 1);

  callback();
}

module.exports = async message => {
  const { author, client, content, channel } = message;

  if (author.bot) {
    return;
  }

  const botUsername = client.user.toString();

  if (content.startsWith(botUsername)) {
    const allowedTags = [...getTags().keys()].filter(
      key => key !== '__reserved',
    );

    const [, tag, ...gibberish] = content.trim().split(' ');

    if (gibberish.length > 0) {
      const attachment = new Attachment(getReservedImage('angryPepe'));

      try {
        const warned = await author.send(
          '**EI _BORDA_, UMA TAG DE CADA VEZ, OK?!?!**',
          { files: [attachment] },
        );

        if (warned) {
          await author.send(`Tags :: ${allowedTags.join(' , ')}`);
        }

        if (message.deletable) {
          await message.delete();
        }
      } catch (e) {
        console.log('WARNING :: ', e.message);
      }

      return;
    }

    if (!tag || !allowedTags.includes(tag)) {
      try {
        if (message.deletable) {
          const deleted = await message.delete();

          if (deleted) {
            throttleUser(author, async () => {
              author.send(`Tags :: ${allowedTags.join(' , ')}`);
            });
          }
        }
      } catch (e) {
        console.log('WARNING :: ', e.message);
      }

      return;
    }

    try {
      const image = getImage(tag);

      throttleUser(author, async () => {
        const attachment = new Attachment(image);

        try {
          if (message.editable) {
            await message.edit(attachment);
          }

          if (message.deletable) {
            await message.delete();
          }

          await channel.send(attachment);
        } catch (e) {
          console.log('WARNING :: ', e.message);
        }
      });
    } catch (e) {
      console.log('WARNING :: ', e.message);

      if (message.deletable) {
        await message.delete();
      }
    }
  }
};
