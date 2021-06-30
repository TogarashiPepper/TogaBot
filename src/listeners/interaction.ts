import { Listener } from 'discord-akairo';
import { readdirSync } from 'fs';
import { MessageActionRow, MessageButton, Interaction, Message, MessageButtonStyle, Collection } from 'discord.js';
import createButton from '../util/buttons';
type ExecuteFunction = (interaction: Interaction) => void;

const buttons = new Collection();
const buttonFiles = readdirSync(__dirname + '/../buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
	const button = require(`${__dirname}/../buttons/${file}`);
	buttons.set(button.customID, button);
}

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
			if (authorID[1] === interaction.user.id) {
				console.log(authorID[0], buttons);
				if (!buttons.has(authorID[0])) return;
				(buttons.get(authorID[0]) as { customID: string, execute: ExecuteFunction} ).execute(interaction);
				console.log(authorID);
			}
			else {
				interaction.deferUpdate();
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
