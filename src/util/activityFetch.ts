import { GuildChannel, Message, Snowflake, VoiceChannel } from "discord.js";
import fetch from "node-fetch";

async function activity(channel: VoiceChannel | GuildChannel, AppID: Snowflake) {
	const res = await fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
	method: 'POST',
	body: JSON.stringify({
		max_age: 86400,
				max_uses: 14,
				target_application_id: AppID,
				target_type: 2,
				temporary: false,
				unique: true,
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bot ' + channel.client.token,
	   },
	});
	return res;
}

export default activity;