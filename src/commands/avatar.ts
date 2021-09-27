import { Message, GuildMember } from 'discord.js';
import { Args, Command, PieceContext } from '@sapphire/framework';

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'avatar',
			description: 'get someone\'s avatar',
			aliases: ['avatar', 'av', 'pfp'],
		});
	}

	async run(message: Message, args: Args) {
		const user = await args.pick('user').catch(() => {
			return message.author;
		});
		return message.reply(user.displayAvatarURL({ size:4096, dynamic: true }));
	}
}

