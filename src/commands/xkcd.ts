import { Message } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
import fetch from "node-fetch";

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'xkcd',
			description: 'search xkcd'
		});
	}

	async run(message: Message) {
	const args = message.content.split(/ +/).slice(1);
	if (args[0] === 'latest') {
		const comic = await fetch('https://xkcd.com/info.0.json');
		const comicAsText = await comic.text();
		const comicObject = JSON.parse(comicAsText);
		const comicArray = Object.values(comicObject);
		const sent = await message.channel.send(`${comicArray[8]}`);
		sent.channel.send(`${comicArray[7]}`);
	}
	if (args[0] === 'specific') {
		// eslint-disable-next-line max-statements-per-line
		if (!args[1]) {message.channel.send('provide a valid id'); return;}
		const comic = await fetch(`http://xkcd.com/${args[1]}/info.0.json`);
		const comicAsText = await comic.text();
		const comicObject = JSON.parse(comicAsText);
		const comicArray = Object.values(comicObject);
		const sent = await message.channel.send(`${comicArray[8]}`);
		sent.channel.send(`${comicArray[7]}`);
	}
	if (args[0] === 'random') {
		const ref = await fetch('https://xkcd.com/info.0.json');
		const refComicAsText = await ref.text();
		const refComicObject = JSON.parse(refComicAsText);
		const refComicArray = Object.values(refComicObject);
		const latestNumber = refComicArray[1] as number;
		const rng = Math.floor(Math.random() * latestNumber);

		const comic = await fetch(`http://xkcd.com/${rng}/info.0.json`);
		const comicAsText = await comic.text();
		const comicObject = JSON.parse(comicAsText);
		const comicArray = Object.values(comicObject);
		const sent = await message.channel.send(`${comicArray[8]}`);
		sent.channel.send(`${comicArray[7]}`);
	}
	}
};

