import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
class mdnCommand extends Command {
	constructor() {
		super('mdn', {
			aliases: ['mdn'],
		});
	}

	async exec(message: Message) {
		const search = message.content.split(/ +/).slice(1).join('+');
		async function getmdn() {
			const fetched = await fetch(`https://developer.mozilla.org/api/v1/search?q=${search}`);
			const data = await fetched.json();
			const embed = await new MessageEmbed().setTitle(data.documents[0].title).setDescription(data.documents[0].summary);
			message.channel.send({ embeds: [embed] });
		}
		await getmdn().catch((err) => {
			console.log(err);
			message.reply('no results found');
		});


	}
}

module.exports = mdnCommand;
