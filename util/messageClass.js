const { Structures, Message } = require('discord.js');

class CoolMsg extends Message {
	constructor(client, data, channel) {
		console.log(data)
		super(client, data, channel);
		function getAllPropertyNames(obj) {
			const props = [];

			do {
				Object.getOwnPropertyNames(obj).forEach(function(prop) {
					if (props.indexOf(prop) === -1) {
						props.push(prop);
					}
				});
			} while (obj = Object.getPrototypeOf(obj));

			return props;
		}
		const hiddenKeys = getAllPropertyNames(this);

		this.hidden = {};
		hiddenKeys.forEach(e => {
			this.hidden[e] = this[e];
		});
	}
}
module.exports = CoolMsg;