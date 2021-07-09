import { SapphireClient } from '@sapphire/framework';
import { token } from './config.json';
const client = new SapphireClient({
	defaultPrefix: '?',
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	caseInsensitiveCommands: true,
});

client.login(token);