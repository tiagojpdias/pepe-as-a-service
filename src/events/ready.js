const { Attachment } = require('discord.js');
const { messages, activities } = require('../../config');
const { getReservedImage } = require('../utils');

const currentDate = new Date(Date.now()).toLocaleString('PT');

module.exports = async client => {
  const helloImage = new Attachment(getReservedImage('hello'));
  await client.channels.get(process.env.MAIN_CHANNEL_ID).send(messages.enter, {
    files: [helloImage],
  });

  const { user } = client;

  await user.setActivity(activities.enter);
  await user.setStatus('online');

  process.on('SIGINT', async () => {
    await user.setStatus('dnd');
    await user.setActivity(activities.exit);

    const goodbyeImage = new Attachment(getReservedImage('goodbye'));
    const messageSent = await client.channels
      .get(process.env.MAIN_CHANNEL_ID)
      .send(messages.exit, {
        files: [goodbyeImage],
      });

    if (messageSent) {
      process.exit(0);
    }
  });

  console.log(`READY :: Pepe-As-A-Service started @ ${currentDate}`);
};
