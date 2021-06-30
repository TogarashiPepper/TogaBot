import { ButtonInteraction, Message} from "discord.js";

const button = { customID: 'delete', execute: (interaction: ButtonInteraction) => {
	(interaction.message as Message).delete();
}}

export = button;
