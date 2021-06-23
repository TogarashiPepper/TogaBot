import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Didyourolla69 extends Command {
    constructor() {
        super('didyourolla69', {
            aliases: ['didyourolla69', '69']
        })
    }
    
    exec(message: Message) {
        const RandInt = Math.floor(Math.random() * 100)

        if (RandInt == 69) {
            message.reply('hahahah you rolled a 69 xDDDDD')
        } else {
            message.reply('you failed.')
        }
    }
}