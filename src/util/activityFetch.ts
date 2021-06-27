import { Message, Snowflake } from "discord.js";
import fetch from "node-fetch";

async function activity(message: Message, AppID: Snowflake) {
	const res = await fetch(`https://discord.com/api/v9/channels/${message.channel.id}/invites`, {
	method: 'POST',
	body: JSON.stringify({
		max_age: 86400,
				max_uses: 14,
				target_application_id: AppID,
				target_type: 2,
				temporary: false,
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bot ' + message.client.token,
	   },
	});
	return res;
}

export default activity;