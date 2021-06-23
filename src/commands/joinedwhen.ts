import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import ms from 'ms';

export default class joinedCommand extends Command {
	constructor() {
		super('joinedAt', {
			aliases: ['joinedAt', 'getJoinDate'],
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
		if(message.guild) {
			if(args.member?.joinedAt) {
				const member = args.member?.joinedAt;
				return message.reply(`${member.toDateString()} or ${ ms(Date.now() - member.getTime()) }`);
			}
			else {
				return message.reply('you must supply an ID or a MENTION');
			}
		}
	}
}
