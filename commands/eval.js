const {Command} = require('discord-akairo');
const {MessageEmbed} = require('discord.js');
class evalCommand extends Command {
	constructor() {
		super('eval', {
			aliases: ['ev', 'eval'],
			ownerOnly: true,
			args: [
				{
					id: 'numOne',
					type: 'string',
				},
				{
					id: 'numTwo',
					type: 'string',
				},
				{
					id: 'numThree',
					type: 'string',
				},
			],
		});
	}

	async exec(message, args) {
		try {

			// eslint-disable-next-line no-var
			var result = message.content.split(' ').slice(1).join(' ');
			// if(message.content.match(flagregex)) {
			// message.flags.push(message.content.match(flagregex)[0]);
			let evaled = await eval('(async () => {' + result + '})()');
			if (evaled !== null || evaled !== undefined) {
				if (typeof evaled != 'string') evaled = require('util').inspect(evaled, {depth: 0});
				message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
			}

			// }
		}
		catch (err) {
			const embed = new MessageEmbed()
				.setTitle('there was an error')
				.setDescription('```' + result + '```' + '\n ```code errored```\n' + '```' + err + '```')
			message.channel.send({embeds: [embed]});
			console.log(err);

		}
	}
}

module.exports = evalCommand;
