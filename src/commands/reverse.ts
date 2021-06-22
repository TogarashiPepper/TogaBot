import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class reverseCommand extends Command {
	constructor() {
		super('reverse', {
			aliases: ['rv', 'revserse'],
		});
	}

	exec(message: Message) {
		const reversed = [...message.content].reverse().join('');
		return message.channel.send({ content: reversed });
	}
}

module.exports = reverseCommand;
