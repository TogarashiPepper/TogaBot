import type { Client, GuildChannel, Snowflake, VoiceChannel } from "discord.js";

export const activity = async (client: Client, channel: VoiceChannel | GuildChannel, AppID: Snowflake) => {
	return (channel as VoiceChannel).createInvite({ 
		maxAge: 86400,
		maxUses: 14,
		targetApplication: AppID,
		targetType: 2,
		temporary: false,
		unique: true,
	});
}