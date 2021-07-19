import { SapphireClient } from '@sapphire/framework';
import { Interaction, MessageButton, MessageButtonStyle } from 'discord.js';
import { token } from './config.json';
const client = new SapphireClient({
	defaultPrefix: '?',
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	partials: ['MESSAGE', 'CHANNEL'],
	caseInsensitiveCommands: true,
	ws: { 
		properties: { $browser: 'Discord iOS' } 
	}
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
	console.log(oldMessage, newMessage)
	if(newMessage.partial || oldMessage.partial) {
		await newMessage.fetch();
		await oldMessage.fetch();

		if(oldMessage.content === newMessage.content) return;
		
		if(!newMessage.partial) {
			client.emit('message', newMessage);
		}
	}
	else {
		client.emit('message', newMessage);	
	}
})

client.on('interactionCreate', (interaction: Interaction) => {
	if(interaction.isCommand()){
		if(interaction.commandName === 'buttons') {
			const button = new MessageButton()
			.setCustomId('1234');
			if(interaction.options.get('label')?.value && (interaction.options.get('label')?.value as string).length < 81) {
				button.setLabel(interaction.options.get('label')?.value as string);
			}
			else button.setLabel('button!');
			if(interaction.options.get('disabled')){
				button.setDisabled(interaction.options.get('disabled')!.value as boolean)
				.setStyle(interaction.options.get('style')!.value as MessageButtonStyle)
				interaction.reply({ content: 'here\'s your custom button!', components:  [{ type: 'ACTION_ROW', components: [button] }], ephemeral: true });
			}
			else {
				button.setDisabled(false)
				.setStyle(interaction.options.get('style')!.value as MessageButtonStyle)
				interaction.reply({ content: 'here\'s your custom button!', components:  [{ type: 'ACTION_ROW', components: [button] }], ephemeral: true });
			}
		}
	}
});

client.login(token);
