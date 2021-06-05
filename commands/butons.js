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
		const oneButton = new MessageButton().setCustomID('1').setLabel('1').setStyle('PRIMARY');
		const delButton = new MessageButton().setCustomID('delete').setLabel('delete').setStyle('SECONDARY');

		const row = new MessageActionRow().addComponents(oneButton, delButton);
		message.channel.send('ello', { components: [row] });
	}
}

module.exports = buttonCommand;
