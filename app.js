require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log(`PEPE READY`);
  client.user.setActivity('Pepe as a Service');
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.includes(client.user.toString())) {
    const splitMessage = message.content.split(' ');
    const tag = splitMessage[1];

    message.channel.send('PEPE INCOMMING', {
      files: [
        'https://i.kym-cdn.com/photos/images/original/001/213/604/4c6.png'
      ]
    });
  }
});
