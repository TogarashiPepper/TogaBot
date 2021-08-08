import { Message, MessageActionRow, MessageComponentInteraction, MessageSelectMenu, Snowflake, VoiceChannel } from "discord.js";
import { Command, PieceContext, CommandOptions } from '@sapphire/framework';
import { APIInvite } from 'discord-api-types/v8';
import activity from "../util/activityFetch";
import { ApplyOptions } from "@sapphire/decorators";


@ApplyOptions<CommandOptions>({ 
	name: 'activity',
	description: 'start a youtube together session',
	aliases: ['activity', 'activities', 'ytt']
})
export default class extends Command {
	async run(message: Message) {
		if(message.guild?.me) {
			const member = message.guild.me;
			const channel = message.guild.channels.cache.find(c => c.type === 'GUILD_VOICE' && c.permissionsFor(member).has('CREATE_INSTANT_INVITE'));
			
			const select = new MessageSelectMenu().setCustomId('select').setPlaceholder('select something!')
			.addOptions([
			{ label:'Youtube Together', value: '755600276941176913' },
			{ label: 'Fishington', value: '814288819477020702' },
			{ label: 'betrayal', value: '773336526917861400' }
			]);
			const row = new MessageActionRow().addComponents([select]);

			const reply = await message.reply({ content: 'select an activity start', components: [row] })
			const filter = (i: MessageComponentInteraction) => { return i.isSelectMenu() && i.message.id === reply.id};
			const collector = message.channel.createMessageComponentCollector({ filter: filter, time: 60000 });

			collector.on('collect', (interaction: MessageComponentInteraction) => {
				if(interaction.isSelectMenu()){
					if(channel?.type === "GUILD_VOICE") {
						activity(channel, interaction.values?.join('') as Snowflake)
						.then((res) => res.json()).then((i: APIInvite) => interaction.update({ content: `https://discord.gg/${i.code}`, components: [] }));
					}
				}
			});
		}
	}
};
