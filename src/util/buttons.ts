import { MessageButton, Snowflake } from "discord.js";

const makeButtton = (id: Snowflake, style: string) => {
	if(style === '1'){
		return new MessageButton()
		.setCustomID(`1-${id}`)
		.setLabel('1')
		.setStyle('PRIMARY');
	}
	else if(style === '2'){
		return new MessageButton()
		.setCustomID(`2-${id}`)
		.setLabel('2')
		.setStyle('DANGER');
	}
	else if(style === 'delete'){
		return new MessageButton()
		.setCustomID(`delete-${id}`)
		.setLabel('delete')
		.setStyle('SECONDARY');
	}
	else {
		return new MessageButton()
		.setCustomID(`delete-${id}`)
		.setLabel('delete')
		.setStyle('SECONDARY');
	}
};
export default makeButtton;
