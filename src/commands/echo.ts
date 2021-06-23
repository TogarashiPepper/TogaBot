import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class echoCommand extends Command {
	constructor() {
		super('echo', {
			aliases: ['echo', 'say'],
		});
	}

	exec(message: Message) {
		message.channel.send(message.content.split(/ +/).slice(1).join(' '));
	}
}
