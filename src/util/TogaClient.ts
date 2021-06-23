import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message, Snowflake } from 'discord.js';

export class TogaClient extends AkairoClient {
	commandHandler: CommandHandler;
	listenerHandler: ListenerHandler;

	constructor() {
		super({
			ownerID: '779403924850343947',
			intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
		}, {
			allowedMentions: { parse: ['users', 'roles'] },
			partials: ['CHANNEL'],
			intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
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

		this.commandHandler.resolver.addType('customMember', async (message: Message, member: string) => {
			if(message.guild) {
				if(message.mentions.users.first()) {
					const user = message.mentions.users?.first() || message.author;
					return await message.guild.members.fetch(user.id).catch(e=>{console.log(e);});
				}
				else if(member) {
					return await message.guild.members.fetch(member as Snowflake).catch(e=>{console.log(e);});
				}
				else{
					return null;
				}
			}
		});
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
		this.commandHandler.loadAll();
	}
}