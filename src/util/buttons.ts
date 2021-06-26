import { Message, MessageButton } from "discord.js";

const createDelButton = (message: Message) => {
	return new MessageButton()
		.setCustomID(`delete-${message.author.id}`)
		.setLabel('delete')
		.setStyle('SECONDARY');
}

const createOneButton = (message: Message) => {
	return new MessageButton()
		.setCustomID(`1-${message.author.id}`)
		.setLabel('1')
		.setStyle('PRIMARY');
}

const createTwoButton = (message: Message) => {
	return new MessageButton()
		.setCustomID(`2-${message.author.id}`)
		.setLabel('2')
		.setStyle('DANGER');
}

export { createDelButton, createOneButton, createTwoButton };
