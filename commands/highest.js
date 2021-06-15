const { Command } = require('discord-akairo');

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

	exec(message, args) {
		if(args.member) {
			return message.reply(args.member.roles.highest.toString(), { allowedMentions: { parse: [] } });
		}
		else {
			return message.reply('you must supply an ID or a MENTION');
		}
	}
}

module.exports = HighestRoleCommand;
