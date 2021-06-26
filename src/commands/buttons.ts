import { Command } from 'discord-akairo';
import { MessageButton, MessageActionRow, Message } from 'discord.js';
import { oneButton, deleteButton } from '../util/buttons.js';

export default class ButtonCommand extends Command {
	constructor() {
		super('button', {
			aliases: ['buttons', 'button'],
		});
	}

	exec(message: Message) {
		const oneButton = oneButton(message);
		const delButton = deleteButton(message);

		const row = new MessageActionRow().addComponents(oneButton, delButton);
		message.channel.send({ content: 'hello', components: [row] });
	}
}
