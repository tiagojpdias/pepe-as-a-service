require('dotenv').config();
const { Client } = require('discord.js');
const config = require('../config');
const { message, ready } = require('./events');

const client = new Client();
client.login(config.botToken);

client.on('ready', () => ready(client));

client.on('message', message);
