import { Message } from "discord.js";
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
		const member = await args.pick('member');
			return message.reply(member.user.displayAvatarURL({ size:2048, dynamic: true }));
	}
};