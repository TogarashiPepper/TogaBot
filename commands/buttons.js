const { Command } = require('discord-akairo');
const { MessageButton, MessageActionRow } = require('discord.js');
class buttonCommand extends Command
{
	constructor()
	{
		super('button', {
			aliases: ['buttons', 'button'],
		});
	}

	exec(message)
	{
		const oneButton = new MessageButton().setCustomID(`1-${message.author.id}`).setLabel('1').setStyle('PRIMARY');
		const delButton = new MessageButton().setCustomID(`delete-${message.author.id}`).setLabel('delete').setStyle('SECONDARY');

		const row = new MessageActionRow().addComponents(oneButton, delButton);
		message.channel.send({ content: 'hello', components: [row] });
	}
}

module.exports = buttonCommand;
