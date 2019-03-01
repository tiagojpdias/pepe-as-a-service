require('dotenv').config();
const { Client } = require('discord.js');
const { botToken } = require('../config');
const { message, ready } = require('./events');

const client = new Client();

client.login(botToken);

client.on('ready', () => ready(client));

client.on('message', message);
