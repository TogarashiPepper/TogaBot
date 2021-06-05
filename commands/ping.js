const { Command } = require('discord-akairo');

class pingCommand extends Command
{
	constructor()
	{
		super('ping', {
			aliases: ['ms', 'ping'],
		});
	}

	exec(message)
	{
		message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
	}
}

module.exports = pingCommand;
