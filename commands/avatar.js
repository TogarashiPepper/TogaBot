const { Command } = require('discord-akairo');
class avatarCommand extends Command
{
	constructor()
	{
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

	exec(message, args)
	{
		if(args.member)
		{
			return message.channel.send(args.member.user.displayAvatarURL({ size:2048, dynamic: true }));
		}
		else
		{
			return message.reply('you must supply an ID or a MENTION');
		}
	}
}

module.exports = avatarCommand;
