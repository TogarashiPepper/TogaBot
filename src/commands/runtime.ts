import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class RuntimeCommand extends Command {
	constructor() {
		super('runtime', {
			aliases: ['uptime', 'runtime'],
		});
	}

	exec(message: Message) {
		if(message.client.uptime) {

			const uptime = message.client.uptime;
			const days = Math.floor(uptime / 86400000);
			const hours = Math.floor(uptime / 3600000) % 24;
			const minutes = Math.floor(uptime / 60000) % 60;
			const seconds = Math.floor(uptime / 1000) % 60;

			message.channel.send(`**Uptime:**\n${days}d ${hours}h ${minutes}m ${seconds}s`);
		}
	}
}
