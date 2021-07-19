import { Message, MessageAttachment, MessageEmbed } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { inspect } from "util";
import fetch from "node-fetch";
const api = "https://emkc.org/api/v1/piston/execute";
interface Fetched {
	ran: boolean;
	language: string;
	version: string;
	output: string;
	stdout: string;
	stderr: string;
}

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'piston',
			description: 'evaluate code in other langs',
			aliases: ['p', 'ps', 'piston'],
		});
	}

	async run(message: Message) {
		const args = message.content.slice(1).replace(/\n/g, ' ').split(/ +/)
		args.shift();
		const lang = args.shift()?.slice(3);
		const code = message.content.match(/```[a-zA-Z+]*\n([\s\S]*?)```/);

		if(code) {
			const body = {
				"language": lang,
				"source": code[1],
			}
			const stopwatch = new Stopwatch();
			const fetched: Fetched = await (await fetch(api, { method: 'post', body:JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})).json();
			const timed = stopwatch.stop().toString();
			const resultEmbed = new MessageEmbed();
			if(fetched.stderr) {
				resultEmbed.setTitle('oops, there was an error')
				.setDescription(`\`\`\`${fetched.stderr}\`\`\``);
				if(fetched.stderr.length > 4000){
					const file = new MessageAttachment(Buffer.from(`${fetched.stderr}`), 'piston.txt');
					await message.reply({ content: 'output was too long to fit into an embed to it has been converted to a file', files: [file] })
				}
				else{
					await message.reply({ embeds: [resultEmbed] })
				}
			}
			else if(fetched.stdout){
				resultEmbed.setTitle(`successfully ran ${fetched.language}`)
				.setDescription(`\`\`\`${lang}\n${fetched.stdout}\`\`\``)
				.setFooter(`Time taken: ${timed}`);
				if(fetched.stdout.length > 4000){
					const file = new MessageAttachment(Buffer.from(`${fetched.stdout}`), 'piston.txt');
					await message.reply({ content: 'output was too long to fit into an embed to it has been converted to a file', files: [file] })
				}
				else{
					await message.reply({ embeds: [resultEmbed] })	
				}
			}
			else{
				message.reply(`\`\`\`${inspect(fetched)}\`\`\``)
			}

		} else {
			message.reply('you must provide code');
		}
	}
};
