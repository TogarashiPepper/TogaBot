import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';

export default class avatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['pfp', 'avatar'],
			args: [
				{
					id: 'member',
					type: 'customMember',
				},
			],
			channel: 'guild',
		});
	}

	exec(message: Message, args: { member: GuildMember | null }) {
		if(args.member) {
			return message.channel.send(args.member.user.displayAvatarURL({ size:2048, dynamic: true }));
		}
		else {
			return message.reply({ content: 'you must supply an ID or a MENTION', allowedMentions: { repliedUser: false } });
		}
	}
}
