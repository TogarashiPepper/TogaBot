const { Command } = require('discord-akairo');

class rngCommand extends Command
{
	constructor()
	{
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

	exec(message, args)
	{
		function getRandomInt(max)
		{
			return Math.floor(Math.random() * Math.floor(max));
		}
		if(args.numOne)
		{
			message.channel.send(getRandomInt(args.numOne).toString());
		}
		else
		{
			message.channel.send(getRandomInt(1000).toString());
		}
	}
}

module.exports = rngCommand;
