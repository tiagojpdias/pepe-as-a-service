const { Client, Attachment } = require('discord.js');
const { getImage } = require('../utils');

const client = new Client();
client.login(process.env.BOT_TOKEN);

const jail = new Set();
function throttleUser(author, cb, time = process.env.MSG_THROTTLE_TIME) {
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
    const [username, tag, ...gibberish] = message.content.split(' ');

    if (gibberish.length > 0) {
      const attachment = new Attachment(getImage('angryPepe'));
      message.channel.send('**You can only provide one tag!!!**', {
        files: [attachment],
      });

      return;
    }

    throttleUser(message.author, () => {
      if (!tag) {
        message.channel.send(`Usage :: _${username} {tag}_`);

        return;
      }

      const attachment = new Attachment(getImage(tag));

      message.channel.send(attachment);
    });
  }
};
