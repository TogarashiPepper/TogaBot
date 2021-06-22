import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';

class HighestRoleCommand extends Command {
	constructor() {
		super('highestRole', {
			aliases: ['highestRole'],
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
			return message.reply({ content: args.member.roles.highest.toString(), allowedMentions: { parse: [] } });
		}
		else {
			return message.reply('you must supply an ID or a MENTION');
		}
	}
}

module.exports = HighestRoleCommand;
