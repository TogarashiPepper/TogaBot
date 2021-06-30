import { ButtonInteraction, MessageActionRow } from "discord.js";
import createButton from '../util/buttons'

const button2 = { customID: '1', execute: (interaction: ButtonInteraction) => {
	const row2 = new MessageActionRow()
	.addComponents([
		createButton(interaction.user.id, '1'),
		createButton(interaction.user.id, 'delete')
	]);
	interaction.update({ content: 'hello', components: [row2] });
}}

export = button2;