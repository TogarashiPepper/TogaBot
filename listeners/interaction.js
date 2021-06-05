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
			
		}
	}
}

module.exports = interactionListener;
