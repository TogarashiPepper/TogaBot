import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class pingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ms', 'ping'],
		});
	}

	exec(message: Message) {
		message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
	}
}