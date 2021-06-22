import { Message, Client, TextChannel } from 'discord.js';

class CoolMsg extends Message {
	hidden: Record<string, unknown>
	constructor(client: Client, data: Message, channel: TextChannel) {
		super(client, data, channel);
		function getAllPropertyNames(obj: CoolMsg) {
			const props: string[] = [];

			do {
				Object.getOwnPropertyNames(obj).forEach(function(prop) {
					if (props.indexOf(prop) === -1) {
						props.push(prop);
					}
				});
			} while (obj = Object.getPrototypeOf(obj));

			return props;
		}
		const hiddenKeys: string[] = getAllPropertyNames(this);

		this.hidden = {};
		hiddenKeys.forEach(key => {
			if (key in this) {
			   this.hidden[key] = this[key as keyof this];
			}
		 });
	}
}
export = CoolMsg;