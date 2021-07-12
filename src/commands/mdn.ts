import { Message, MessageEmbed } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
import fetch from "node-fetch";

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'mdn',
			description: 'search mdn for something'
		});
	}

	async run(message: Message) {
		const search = message.content.split(/ +/).slice(1).join('+');		
		const getmdn = async () => {
			const fetched = await fetch(`https://developer.mozilla.org/api/v1/search?q=${search}`);
			const data = await fetched.json();
			const embed = await new MessageEmbed().setTitle(data.documents[0].title).setDescription(data.documents[0].summary.replace(/\n/g, ''));
			message.channel.send({ embeds: [embed] });
		}

		await getmdn().catch((err) => {
			console.log(err);
			message.reply('no results found');
		});
	}
};
