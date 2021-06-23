import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import TogaClient from '../util/TogaClient';

export default class helpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['commands', 'help'],
		});
	}

	exec(message: Message) {
		const arr: string[] = [];
		const client = message.client as TogaClient;
		const c = client.commandHandler.modules;
		c.forEach((e: any) => arr.push(e.id));
		const embed = new MessageEmbed()
			.setTitle('commands')
			.setColor('#0099ff')
			.setDescription(arr.join('\n'));
		message.channel.send({ embeds: [embed] });

	}
}
