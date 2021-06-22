import { token } from './config.json';
import { Structures } from 'discord.js';
import CoolMsg from './util/messageClass';
import TogaClient from './util/TogaClient';
Structures.extend('Message', () => {
	return CoolMsg;
});

const client = new TogaClient();
client.login(token);
