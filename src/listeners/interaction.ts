import { Listener } from 'discord-akairo';
import { MessageActionRow, MessageButton, Interaction, Message, MessageButtonStyle } from 'discord.js';
import createButton from '../util/buttons';

export default class InteractionListener extends Listener {
	constructor() {
		super('interaction', {
			emitter: 'client',
			event: 'interaction',
		});
	}

	exec(interaction: Interaction) {
		if (interaction.isButton() && interaction.componentType == 'BUTTON') {
			const authorID = interaction.customID.split('-');
			console.log(authorID);
			
			if (authorID[1] === interaction.user.id) {
				console.log(authorID);

				const row = new MessageActionRow()
					.addComponents([
						createButton(interaction.user.id, '2'),
						createButton(interaction.user.id, 'delete')
					]);

				const row2 = new MessageActionRow().addComponents([
					createButton(interaction.user.id, '1'),
					createButton(interaction.user.id, 'delete')
				]);
				
				if (interaction.customID.startsWith('delete') && authorID[1] === interaction.user.id) {
					(interaction.message as Message).delete();
				}
				
				if (interaction.customID.startsWith('1')) {
					interaction.update({ content: 'hello', components: [row] });
				}
				
				else if (interaction.customID.startsWith('2')) {
					interaction.update({ content: 'hello', components: [row2] });
				}
			}
			
			else {
				interaction.reply({ content: 'you don\'t have permissions to use this button or its not registered as a button in my list', ephemeral: true });
			}
		}
		else if(interaction.isCommand()){
			if (interaction.commandName === 'buttons') {
				const button = new MessageButton()
				.setDisabled(interaction.options.get('disabled')!.value as boolean)
				.setStyle(interaction.options.get('style')!.value as MessageButtonStyle)
				.setLabel('button!')
				.setCustomID('1234')
				interaction.reply({ content: 'here\'s your custom button!', components: [[button]], ephemeral: true });
			}
		}
	}
}
