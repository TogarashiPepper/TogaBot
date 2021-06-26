import { Message, MessageButton } from "discord.js";

const _createButton = (id: string, label: string, style: string) => {
	return new MessageButton()
		.setCustomID(id)
		.setLabel(label)
		.setStyle(style)
}

const createButton = {
	del: function(message: Message) {
		return _createButton(`del-${message.author.id}`, 'delete', 'SECONDARY');
	},

	one: function(message: Message) {
		return _createButton(`1-${message.author.id}`, '1', 'PRIMARY');
	},

	two: function(message: Message) {
		return _createButton(`2-${message.author.id}`, '2', 'DANGER');
	}
}

export { createButton };
