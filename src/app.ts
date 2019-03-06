import { Client } from 'discord.js';
import dotenv from 'dotenv';
import config from '../config';
import { message, ready } from './events';

dotenv.config();

const client: Client = new Client();

client.login(config('bot.token'));
client.on('ready', () => ready(client));
client.on('message', message);
