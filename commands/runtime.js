const { Command } = require('discord-akairo');

class runtimeCommand extends Command {
	constructor() {
		super('runtime', {
			aliases: ['uptime', 'runtime'],
		});
	}

	exec(message) {
		const days = Math.floor(message.client.uptime / 86400000);
		const hours = Math.floor(message.client.uptime / 3600000) % 24;
		const minutes = Math.floor(message.client.uptime / 60000) % 60;
		const seconds = Math.floor(message.client.uptime / 1000) % 60;

		message.channel.send(`**Uptime:**\n${days}d ${hours}h ${minutes}m ${seconds}s`);
	}
}

module.exports = runtimeCommand;
