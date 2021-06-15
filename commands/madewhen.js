const { Command } = require('discord-akairo');
const ms = require('ms');
class madeWhenCommand extends Command {
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

	exec(message, args) {
		if(args.member) {
			return message.reply(`${args.member.user.createdAt.toDateString()} or ${ms(Date.now() - args.member.user.createdAt)}`);
		}
		else {
			return message.reply('you must supply an ID or a MENTION');
		}
	}
}

module.exports = madeWhenCommand;
