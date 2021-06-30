import { Message } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
import { APIInvite } from 'discord-api-types/v8';
import activity from "../../util/activityFetch";

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'activity',
			description: 'start a youtube together session',
			aliases: ['activity', 'activities', 'ytt']
		});
	}

	async run(message: Message) {
		if(message.guild?.me) {
			const member = message.guild.me;
			const channel = message.guild.channels.cache.find(c => c.type === 'voice' && c.permissionsFor(member).has('CREATE_INSTANT_INVITE'));
			
			if(channel) {
			activity(message, '755600276941176913')
			.then((res) => res.json()).then((i: APIInvite) => message.channel.send({ content: `https://discord.gg/${i.code}` }));
			}
		}
	}
};
