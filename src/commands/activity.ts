import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import fetch from 'node-fetch';

export default class ActivityCommand extends Command {
	constructor() {
		super('activity', {
			aliases: ['activity', 'game'],
			channel: 'guild',
		});
	}

	exec(message: Message) {
		if(message.guild && message.guild.me) {
			const member = message.guild.me;
			const channel = message.guild.channels.cache.find(c => c.type === 'voice' && c.permissionsFor(member).has('CREATE_INSTANT_INVITE'));
			
			if(channel) {
				fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
					method: 'POST',
					body: JSON.stringify({
						max_age: 86400,
						max_uses: 14,
						target_application_id: '755600276941176913',
						target_type: 2,
						temporary: false,
					}),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bot ' + message.client.token,
					},
				}).then((res: any) => res.json()).then((i: any) => message.channel.send({ content: `https://discord.gg/${i.code}` }));
			}
		}
	}
}
