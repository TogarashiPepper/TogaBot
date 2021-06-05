const { AkairoClient, CommandHandler } = require('discord-akairo');
const { token } = require('./config.json');
class MyClient extends AkairoClient
{
	constructor()
	{
		super({
			ownerID: '779403924850343947', // or ['123992700587343872', '86890631690977280']
		}, {
			disableMentions: 'everyone',
			intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
			partials: ['CHANNEL'],
		});

		this.commandHandler = new CommandHandler(this, {
			directory: './commands/',
			prefix: '?',
			handleEdits: true,
			commandUtil: true,
		});
		this.commandHandler.resolver.addType('customMember', async (message, member) =>
		{
			if(message.mentions.users.first())
			{
				const user = message.mentions.users.first();
				return await message.guild.members.fetch(user.id).catch(e=>{console.log(e);});
			}
			else
			{
				return await message.guild.members.fetch(member).catch(e=>{console.log(e);});
			}
		});
		this.commandHandler.loadAll();
	}
}
const client = new MyClient();
client.login(token);
