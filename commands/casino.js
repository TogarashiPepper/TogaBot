const { Command } = require('discord-akairo');
const { mongoURL } = require('../config.json');
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

async function main(message) {
	const args = message.content.split(/ +/);
	args.shift();
	let num = getRandomInt(2);
	if(num === 1) { num = 'tails'; }
	if(num === 0) { num = 'heads'; }
	console.log(num, args);
	if(args[0] === num) {
		message.reply('you win');
	}
	else {
		message.reply('get rekt');
	}
}


class casinoCommand extends Command {
	constructor() {
		super('coinflip', {
			aliases: ['cf', 'coinflip'],
		});
	}

	exec(message) {

		main(message).catch(err => {console.error(err); message.reply(); });
	}
}

module.exports = casinoCommand;
