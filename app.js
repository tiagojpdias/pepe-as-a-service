const Discord = require('discord.js');

const client = new Discord.Client();

client.login('NTQ5ODkxNzUzODM0OTcxMTQ3.D1afrw.q85S5b3pDvziJD2kwbEJydDd1iY');

client.on('ready', () => { console.log('The bot is ready'); });

client.on('message', (msg) => {
	if (msg.content.includes('pepe')) {
		    msg.reply('oi');
	}
});
