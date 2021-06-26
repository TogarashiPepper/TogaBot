import { Command } from 'discord-akairo';
import { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment, Message } from 'discord.js';
import { inspect } from 'util';
import createButton from '../util/buttons';

export default class EvalCommand extends Command {
	constructor() {
		super('eval', {
			aliases: ['ev', 'eval'],
			ownerOnly: true,
		});
	}

	async exec(message: Message) {
		const delButton = createButton.del(message)
		const row = new MessageActionRow().addComponents(delButton);
		
		try {
			// eslint-disable-next-line no-var
			const result = message.content.split(' ').slice(1).join(' ');
			// if(message.content.match(flagregex)) {
			// message.flags.push(message.content.match(flagregex)[0]);
			
			let evaled = await eval('(async () => {' + result + '})()');
			if (typeof evaled != 'string') evaled = inspect(evaled, { depth: 0 });
			
			if (`\`\`\`js\n${evaled}\`\`\``.length < 2000) {
				message.channel.send({ content: `\`\`\`js\n${evaled}\`\`\``, components: [row] });
			}
			else {
				const file = new MessageAttachment(Buffer.from(`${evaled}`), 'eval.js');
				message.channel.send({ content: 'the result of eval was over 2000 characters so it has been converted to a file', files: [file], components: [row] });
			}
			// }
		}
		catch (err) {
			// eslint-disable-next-line no-shadow
			const result = message.content.split(' ').slice(1).join(' ');
			const embed = new MessageEmbed()
				.setTitle('there was an error')
				.setDescription('```' + result + '```' + '\n ```code errored```\n' + '```' + err + '```');

			message.channel.send({ embeds: [embed], components: [row] });
			console.log(err);

		}
	}
}
