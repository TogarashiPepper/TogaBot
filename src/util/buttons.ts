import { Message, MessageButton } from "discord.js";

const makeButtton = (message: Message, style: string) => {
	if(style === '1'){
		return new MessageButton()
		.setCustomID(`1-${message.author.id}`)
		.setLabel('1')
		.setStyle('PRIMARY');
	}
	else if(style === '2'){
		return new MessageButton()
		.setCustomID(`2-${message.author.id}`)
		.setLabel('2')
		.setStyle('DANGER');
	}
	else if(style === 'delete'){
		return new MessageButton()
		.setCustomID(`delete-${message.author.id}`)
		.setLabel('delete')
		.setStyle('SECONDARY');
	}
	else {
		return new MessageButton()
		.setCustomID(`delete-${message.author.id}`)
		.setLabel('delete')
		.setStyle('SECONDARY');
	}
};
export default makeButtton;
