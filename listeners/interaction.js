const { Listener } = require('discord-akairo');

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
			if(interaction.customID.startsWith('delete') && authorID[1] === interaction.user.id)
			{
				interaction.message.delete();
			}
			else
			{
				interaction.deferUpdate()
			}
		}
	}
}

module.exports = interactionListener;
