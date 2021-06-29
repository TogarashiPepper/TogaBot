import { Listener } from 'discord-akairo';
import { MessageActionRow, MessageButton, Interaction, Message, MessageButtonStyle, ButtonInteraction } from 'discord.js';
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
			
			else if(interaction.customID.startsWith('1234')) {
					interaction.deferUpdate();
			}

			else {
				interaction.reply({ content: 'you don\'t have permissions to use this button or its not registered as a button in my list', ephemeral: true });
			}
		}
		else if(interaction.isCommand()){
			if (interaction.commandName === 'buttons') {
				const button = new MessageButton()
				.setCustomID('1234');
				if(interaction.options.get('label')?.value && (interaction.options.get('label')?.value as string).length < 81) {
					button.setLabel(interaction.options.get('label')?.value as string);
				}
				else button.setLabel('button!');
				if(interaction.options.get('disabled')){
					button.setDisabled(interaction.options.get('disabled')!.value as boolean)
					.setStyle(interaction.options.get('style')!.value as MessageButtonStyle)
					interaction.reply({ content: 'here\'s your custom button!', components: [[button]], ephemeral: true });
				}
				else {
					button.setDisabled(false)
					.setStyle(interaction.options.get('style')!.value as MessageButtonStyle)
					interaction.reply({ content: 'here\'s your custom button!', components: [[button]], ephemeral: true });
				}
			}
		}
	}
}
