const { Command } = require('discord-akairo');

class reverseCommand extends Command
{
	constructor()
	{
		super('reverse', {
			aliases: ['rv', 'revserse'],
		});
	}

	exec(message)
	{
		const reversed = [...message.content].reverse().join('');
		return message.channel.send({ content: reversed });
	}
}

module.exports = reverseCommand;
