import { ButtonInteraction, MessageActionRow } from "discord.js";
import createButton from '../util/buttons'

const button1 = { customID: '1', execute: (interaction: ButtonInteraction) => {
	const row = new MessageActionRow()
	.addComponents([
		createButton(interaction.user.id, '2'),
		createButton(interaction.user.id, 'delete')
	]);

	interaction.update({ content: 'hello', components: [row] });
}}

export = button1;