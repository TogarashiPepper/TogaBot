import { Message, MessageAttachment, MessageEmbed } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
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
			description: 'evaluate code in other langs'
		});
	}

	async run(message: Message) {
		const args = message.content.slice('?'.length).replace(/\n/g, ' ').split(/ +/)
		args.shift();
		const lang = args.shift()?.slice(3);
		const code = message.content.match(/```[a-zA-Z+]*\n([\s\S]*?)```/);

		if(code) {
			const body = {
				"language": lang,
				"source": code[1],
			}
			const fetched: Fetched = await (await fetch(api, { method: 'post', body:JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})).json();
			const resultEmbed = new MessageEmbed();
			if(fetched.stderr) {
				resultEmbed.setTitle('oops, there was an error')
				.setDescription(`\`\`\`${fetched.stderr}\`\`\``);
				message.reply({ embeds: [resultEmbed] })
			}
			else if(fetched.stdout){
				resultEmbed.setTitle(`successfully ran ${fetched.language}`)
				.setDescription(`\`\`\`${lang}\n${fetched.stdout}\`\`\``);
				message.reply({ embeds: [resultEmbed] })	
			}
			else{
				message.reply(`\`\`\`${inspect(fetched)}\`\`\``)
			}

		} else {
			message.reply('you must provide code');
		}
	}
};
