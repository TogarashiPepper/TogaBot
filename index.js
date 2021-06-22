const { token } = require('./config.json');
const { Structures } = require('discord.js');
const CoolMsg = require('./util/messageClass.js');
const TogaClient = require('./util/TogaClient');
Structures.extend('Message', Message => {
	return CoolMsg;
});

const client = new TogaClient();
client.login(token);
