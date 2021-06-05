const { Command } = require('discord-akairo');
const ms = require('ms');
class joinedCommand extends Command
{
	constructor()
	{
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

	exec(message, args)
	{
		if(args.member)
		{
			return message.reply(`${args.member.joinedAt.toDateString()} or ${ms(Date.now() - args.member.joinedAt)}`);
		}
		else
		{
			return message.reply('you must supply an ID or a MENTION');
		}
	}
}

module.exports = joinedCommand;
