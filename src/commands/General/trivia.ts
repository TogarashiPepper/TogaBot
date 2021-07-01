import { Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageComponentInteraction, Collection } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
import triviaFetch from '../../util/triviaFetch'

interface response {
	response_code: 0,
	results: [
	  {
		category: string,
		type: string,
		difficulty: string,
		question: string,
		correct_answer: string,
		incorrect_answers: string[]
	  }
	]
}

export default class extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'trivia',
			description: 'trivia'
		});
	}

	async run(message: Message) {
		const response: response = await triviaFetch('https://opentdb.com/api.php?amount=1');
		const arrOfAnswers = response.results[0].incorrect_answers;
		arrOfAnswers.push(response.results[0].correct_answer);
		
		const embed = new MessageEmbed()
		.setTitle('trivia')
		.setDescription(`question: ${response.results[0].question}`);

		const first = arrOfAnswers.shift() || 'answer not found';
		const second = arrOfAnswers.shift() || 'answer not found';
		const third = arrOfAnswers.shift() || 'answer not found';
		const fourth = arrOfAnswers.shift() || 'answer not found';

		const select = new MessageSelectMenu().setCustomID('trivia')
		.addOptions([
		{ label: first, value: first },
		{ label: second, value: second },
		{ label: third, value: third },
		{ label: fourth, value: fourth }
		]);
		const row = new MessageActionRow().addComponents([select]);
		const reply = await message.reply({ embeds: [embed], components: [row] })

		const filter = (i: MessageComponentInteraction) => { return i.isSelectMenu() };
		const collector = message.channel.createMessageComponentInteractionCollector({ filter: filter, time: 60000, max: 1 });

		collector.on('collect', (interaction: MessageComponentInteraction) => {
			if(interaction?.isSelectMenu()){
				if(interaction.values?.join('') === response.results[0].correct_answer) {
					interaction.update({ embeds: [], content:'you win!', components: [] })
				}
				else {
					interaction.update({ embeds: [], content:'you lose', components: [] })
				}
			}
		});
		collector.on('end', () => {
			reply.edit({ content: 'this game timed out', embeds: [], components: [] })
		})

	}
};