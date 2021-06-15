const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
class helpCommand extends Command
{
	constructor()
	{
		super('help', {
			aliases: ['commands', 'help'],
		});
	}

	exec(message)
	{
		const arr = [];
		const c = message.client.commandHandler.modules;
		c.forEach(e=>arr.push(e.id));
		const embed = new MessageEmbed().setTitle('commands').setColor('#0099ff').setDescription(arr.join('\n'));
		message.channel.send({ embeds: [embed] });

	}
}

module.exports = helpCommand;
