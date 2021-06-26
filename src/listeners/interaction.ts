import { Listener } from 'discord-akairo';
import { MessageActionRow, MessageButton, Interaction, Message } from 'discord.js';

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
						new MessageButton()
							.setCustomID(`2-${authorID[1]}`)
							.setLabel('2')
							.setStyle('DANGER'),
						new MessageButton()
							.setCustomID(`delete-${authorID[1]}`)
							.setLabel('delete')
							.setStyle('SECONDARY')
					]);

				const row2 = new MessageActionRow().addComponents([
					new MessageButton()
						.setCustomID(`1-${authorID[1]}`)
						.setLabel('1')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomID(`delete-${authorID[1]}`)
						.setLabel('delete')
						.setStyle('SECONDARY')
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
	}
}
