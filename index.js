const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { token } = require('./config.json');
const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {
  class CoolGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.cool = true;
    }
  }

  return CoolGuild;
});
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
		this.listenerHandler = new ListenerHandler(this, {
			directory: './listeners/',
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
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
		this.commandHandler.loadAll();
	}
}

const client = new MyClient();
client.login(token);
