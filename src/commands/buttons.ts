import { Command, PieceContext } from '@sapphire/framework';
import { MessageActionRow, Message } from 'discord.js';
import createButton from '../util/buttons';

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'buttons',
			description: 'make some buttons!',
			aliases: ['button', 'buttons']
		});
	}

	async run(message: Message) {
		const oneButton = createButton(message.author.id, '1');
		const delButton = createButton(message.author.id, 'delete');
		const row = new MessageActionRow().addComponents(oneButton, delButton);
		message.reply({ content: 'hello', components: [row] });
	}
};