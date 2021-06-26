import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class DidYouRollA69 extends Command {
    constructor() {
        super('didyourolla69', {
            aliases: ['didyourolla69', '69']
        });
    }
    
    exec(message: Message) {
        const randInt = Math.floor(Math.random() * 100);

        if (randInt == 69) {
            message.reply('hahahah you rolled a 69 xDDDDD');
        } else {
            message.reply('you failed.');
        }
    }
}
