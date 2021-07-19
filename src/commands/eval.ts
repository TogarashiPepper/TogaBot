import { Message, MessageAttachment, MessageActionRow, MessageEmbed } from "discord.js";
import { Args, Command, PieceContext } from '@sapphire/framework';
import { inspect } from "util";
import createButton from '../util/buttons';

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'eval',
			description: 'evaluate code',
			aliases: ['ev', 'eval'],
			strategyOptions: { flags: ['async'] }
		});
	}

	async run(message: Message, args: Args) {
		if(message.author.id === '779403924850343947') {
			const delButton = createButton(message.author.id, 'delete');
			const row = new MessageActionRow().addComponents(delButton);

			try {
				let result;
				result = args.getFlags('async') ? message.content.split(' ').slice(2).join(' ') : message.content.split(' ').slice(1).join(' ')
				// if(message.content.match(flagregex)) {
				// message.flags.push(message.content.match(flagregex)[0]);
				let evaled;
				if(args.getFlags('async')){
					evaled = await eval('(async () => {' + result + '})()');
				}
				else {
					evaled = await eval(result);
				}
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
				const result = message.content.split(' ').slice(1).join(' ');
				const embed = new MessageEmbed()
					.setTitle('there was an error')
					.setDescription('```' + result + '```' + '\n ```code errored```\n' + '```' + err + '```');

				message.channel.send({ embeds: [embed], components: [row] });
				console.log(err);

			}
		}	
	}
};