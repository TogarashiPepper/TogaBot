import { Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageComponentInteraction } from "discord.js";
import { Command, PieceContext } from '@sapphire/framework';
import triviaFetch from '../util/triviaFetch'
import arrayShuffle from '../util/arrayShuffle';
import { decode } from 'he';

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
		let response: response = await triviaFetch('https://opentdb.com/api.php?amount=1');
		const arrOfAnswers = response.results[0].incorrect_answers;
		arrOfAnswers.push(response.results[0].correct_answer);
		arrayShuffle(arrOfAnswers);

		const first = decode(arrOfAnswers.shift() as string) || '1: answer not found';
		const second = decode(arrOfAnswers.shift() as string) || '2: answer not found';
		const third = decode(arrOfAnswers.shift() as string) || '3: answer not found';
		const fourth = decode(arrOfAnswers.shift() as string) || '4: answer not found';

		const embed = new MessageEmbed()
		.setTitle('trivia')
		.setDescription(`question: ${decode(response.results[0].question)}\n1:${first}\n2:${second}\n3:${third}\n4:${fourth}`);


		const select = new MessageSelectMenu().setCustomId(message.id)
		.addOptions([
		{ label: '1', value: first },
		{ label: '2', value: second },
		{ label: '3', value: third },
		{ label: '4', value: fourth }
		]);
		const row = new MessageActionRow().addComponents([select]);
		const reply = await message.reply({ embeds: [embed], components: [row] })

		const filter = (i: MessageComponentInteraction) => { return i.isSelectMenu() && i.customId === message.id };
		const collector = message.channel.createMessageComponentCollector({ filter: filter, time: 60000 });

		collector.on('collect', async (interaction: MessageComponentInteraction) => {
			if(interaction?.isSelectMenu()){
				if(interaction.values?.join('') === response.results[0].correct_answer) {
					await interaction.update({ embeds: [], content:'you win!', components: [] })
					collector.stop();
				}
				else {
					await interaction.update({ embeds: [], content:'you lose', components: [] })
					collector.stop();
				}
			}
		});

	}
};