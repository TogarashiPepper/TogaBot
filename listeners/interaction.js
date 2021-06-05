const { Listener } = require('discord-akairo');
const { MessageActionRow, MessageButton } = require('discord.js');

class interactionListener extends Listener
{
	constructor()
	{
		super('interaction', {
			emitter: 'client',
			event: 'interaction',
		});
	}

	exec(interaction)
	{
		if(interaction.isMessageComponent() && interaction.componentType == 'BUTTON')
		{
			const authorID = interaction.customID.split('-');
			console.log(authorID);
			const oneButton = new MessageButton().setCustomID(`1-${authorID[1]}`).setLabel('1').setStyle('PRIMARY');
			const twoButton = new MessageButton().setCustomID(`2-${authorID[1]}`).setLabel('2').setStyle('DANGER');
			const delButton = new MessageButton().setCustomID(`delete-${authorID[1]}`).setLabel('delete').setStyle('SECONDARY');
			const row = new MessageActionRow().addComponents(twoButton, delButton);

			const row2 = new MessageActionRow().addComponents(oneButton, delButton);
			if(interaction.customID.startsWith('delete') && authorID[1] === interaction.user.id)
			{
				interaction.message.delete();
			}
			if(interaction.customID.startsWith('1'))
			{
				interaction.update('hello', { components: [row] });
			}
			else if(interaction.customID.startsWith('2'))
			{
				interaction.update('hello', { components: [row2] });
			}
			else
			{
				interaction.deferUpdate();
			}
		}
	}
}

module.exports = interactionListener;
