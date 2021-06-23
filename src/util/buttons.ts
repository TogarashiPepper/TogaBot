import { Message, MessageButton } from "discord.js";

function deleteButton(message: Message) {
	return new MessageButton().setCustomID(`delete-${message.author.id}`).setLabel('delete').setStyle('SECONDARY');
}

function oneButton(message: Message){
	return new MessageButton().setCustomID(`1-${message.author.id}`).setLabel('1').setStyle('PRIMARY');
}

function twoButton(message: Message){
	return new MessageButton().setCustomID(`2-${message.author.id}`).setLabel('2').setStyle('DANGER');
}

export { deleteButton, oneButton, twoButton };