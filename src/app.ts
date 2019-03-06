import dotenv from 'dotenv';
dotenv.config();

import { Client } from 'discord.js';
import config from '../config';
import { message, ready } from './events';

const client: Client = new Client();

client.login(config('bot.token'));
client.on('ready', () => ready(client));
client.on('message', message);
