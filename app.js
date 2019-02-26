require('dotenv').config();

const { Client, Attachment } = require('discord.js');

const client = new Client();

const files = [
  'https://i.kym-cdn.com/photos/images/original/001/213/604/4c6.png',
];

const messages = {
  enter: 'bom dia a todos menos a um',
  exit: 'XAU AI _BORDAS_',
};

const activities = {
  enter: 'Pepe as a Service',
  exit: `Screw u guys I'm going home`,
};

client.login(process.env.BOT_TOKEN);

client.on('ready', async () => {
  client.channels.get(process.env.MAIN_CHANNEL_ID).send(messages.enter);

  const currentDate = new Date(Date.now()).toLocaleString('PT');

  console.log(`READY :: Pepe-As-A-Service started @ ${currentDate}`);

  const { user } = client;

  await user.setActivity(activities.enter);
  await user.setStatus('online');

  process.on('SIGINT', async () => {
    await user.setStatus('dnd');
    await user.setActivity(activities.exit);

    const messageSent = await client.channels
      .get(process.env.MAIN_CHANNEL_ID)
      .send(messages.exit);

    if (messageSent) {
      process.exit(0);
    }
  });
});

client.on('message', async message => {
  if (message.author.bot) {
    return;
  }

  const botUsername = client.user.toString();

  if (message.content.includes(botUsername)) {
    const attachment = new Attachment(files[0]);

    const messageSent = message.channel.send(attachment);

    if (messageSent) {
      // add user to waiting list
    }
  }
});
