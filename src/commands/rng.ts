import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class RngCommand extends Command {
	constructor() {
		super('rng', {
			aliases: ['randomNum', 'rng'],
			args: [
				{
					id: 'numOne',
					type: 'number',
					default: 0,
				},
			],
		});
	}

	exec(message: Message, args: { numOne: number }) {
		const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));
		
		if(args.numOne) {
			message.channel.send(getRandomInt(args.numOne).toString());
		}
		
		else {
			message.channel.send(getRandomInt(1000).toString());
		}
	}
}
