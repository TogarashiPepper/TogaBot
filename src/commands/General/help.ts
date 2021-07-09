import { Message, MessageEmbed } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'help',
			description: 'lists all the commands for you'
		});
	}

	async run(message: Message) {
		const commandMap = this.context.stores.get('commands');
		const commands: string[] = [];
		commandMap.forEach(command => commands.push(`**${command.name}**\n${command.description}\n`));
		const embed = new MessageEmbed().setDescription(commands.join(''));
		message.reply({ embeds: [embed] })
	}
};