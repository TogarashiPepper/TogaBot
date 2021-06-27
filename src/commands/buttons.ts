import { Command } from 'discord-akairo';
import { MessageButton, MessageActionRow, Message } from 'discord.js';
import createButton from '../util/buttons';

export default class ButtonCommand extends Command {
	constructor() {
		super('button', {
			aliases: ['buttons', 'button'],
		});
	}

	exec(message: Message) {
		const oneButton = createButton(message, '1');
		const delButton = createButton(message, 'delete');

		const row = new MessageActionRow().addComponents(oneButton, delButton);
		message.channel.send({ content: 'hello', components: [row] });
	}
}
