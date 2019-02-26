const { Client } = require('discord.js');
const { message, ready } = require('./events');

const client = new Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => ready(client));

client.on('message', message);
