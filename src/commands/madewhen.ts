import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import ms from 'ms';

export default class madeWhenCommand extends Command {
	constructor() {
		super('createdAt', {
			aliases: ['createdAt', 'getCreationDate'],
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
			return message.reply(`${args.member.user.createdAt.toDateString()} or ${ms(Date.now() - args.member.user.createdTimestamp)}`);
		}
		else {
			return message.reply('you must supply an ID or a MENTION');
		}
	}
}
