const { Message } = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
class activityCommand extends Command {
	constructor() {
		super('activity', {
			aliases: ['activity', 'game'],
			channel: 'guild',
		});
	}

	/**
	* 	@param {Message} message
	*/
	exec(message){
		const channel = message.guild.channels.cache.find(c => c.type === 'voice' && c.permissionsFor(message.guild.me).has('CREATE_INSTANT_INVITE'));
		fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 14,
                target_application_id: '755600276941176913',
                target_type: 2,
                temporary: false,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bot " + message.client.token
            }
		}).then(res => res.json()).then(i => message.channel.send({ content: `https://discord.gg/${i.code}` }));
	}
}

module.exports = activityCommand;