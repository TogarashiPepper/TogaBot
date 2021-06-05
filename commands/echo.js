const { Command } = require('discord-akairo');

class echoCommand extends Command
{
	constructor()
	{
		super('echo', {
			aliases: ['echo', 'say'],
		});
	}

	exec(message)
	{
		message.channel.send(message.content.split(/ +/).slice(1).join(' '));
	}
}

module.exports = echoCommand;
