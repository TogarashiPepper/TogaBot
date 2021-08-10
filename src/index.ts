import { SapphireClient } from '@sapphire/framework';
import { Interaction, Message, MessageButton, MessageButtonStyle } from 'discord.js';
import { token } from './config.json';

const client = new SapphireClient({
	defaultPrefix: '?',
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	partials: ['MESSAGE', 'CHANNEL'],
	caseInsensitiveCommands: true,
	ws: {
		properties: { $browser: 'Discord iOS' },
	},
});

client.once('ready', () => {
	"TogaBot is online" |>> console.log;
});

client.on('interactionCreate', (interaction: Interaction) => {
	if(interaction.isCommand()) {
		if(interaction.commandName === 'buttons') {
			const button = new MessageButton()
				.setCustomId('1234');
			if(interaction.options.get('label')?.value && (interaction.options.get('label')?.value as string).length < 81) {
				button.setLabel(interaction.options.get('label')?.value as string);
			}
			else {button.setLabel('button!');}
			if(interaction.options.get('disabled')) {
				button.setDisabled(interaction.options.getBoolean('disabled', true))
					.setStyle(interaction.options.getString('style', true) as MessageButtonStyle);
				interaction.reply({ content: 'here\'s your custom button!', components:  [{ type: 'ACTION_ROW', components: [button] }], ephemeral: true });
			}
			else {
				button.setDisabled(false)
					.setStyle(interaction.options.getString('style', true) as MessageButtonStyle);
				interaction.reply({ content: 'here\u0027s your custom button!', components:  [{ type: 'ACTION_ROW', components: [button] }], ephemeral: true });
			}
		}
	}
	else if(interaction.isButton()) {
		if(interaction.user.id === '779403924850343947') (interaction.message as Message).delete();
	}
});

client.on('messageUpdate', async (oldMessage, newMessage): Promise<void> => {
	if(newMessage.content === oldMessage.content) return;
	if(oldMessage.partial || newMessage.partial) {
		await newMessage.fetch();
		await oldMessage.fetch();
		client.emit('message', newMessage as Message);
	}
	else {
		client.emit('message', newMessage as Message);
	}
});

declare module '@sapphire/pieces' {
	interface Container {
		owo: string
	}
}

client.login(token);
