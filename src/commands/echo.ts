import { Message } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'echo',
			description: 'Echo your input back to you'
		});
	}

	async run(message: Message) {
		message.reply({ content: message.content })
	}
};