const data1 = {
	name: 'avatar',
	description: 'gets a user\'s avatar',
	options: [{
		name: 'target',
		type: 'USER',
		description: 'the user to get the avatar from',
	}],
};

const data2 = {
	name: 'buttons',
	description: 'makes some buttons',
	options: [{
		name: 'stlye',
		type: 'STRING',
		description: 'the style of the button',
		choices: [
			{
				name: 'red',
				value: 'DANGER',
			},
			{
				name: 'blurple',
				value: 'PRIMARY',
			},
			{
				name: 'green',
				value: 'SUCCESS',
			},
			{
				name: 'grey',
				value: 'SECONDARY',
			},
		],
		required: true,
	}],
};
const data3 = {
	name: 'mdn',
	description: 'search mdn',
	options: [{
		name: 'query',
		type: 'STRING',
		description: 'what to search mdn for',
		required: true,
	}],
};

const data4 = {
	name: 'xkcd',
	description: 'search xkcd for a comic',
	options: [{
		name: 'query',
		type: 'STRING',
		description: 'the number of the comic',
		required: true,
	}],
};

const data5 = {
	name: 'eval',
	description: 'evaluate code, developer only',
	options: [{
		name: 'code',
		type: 'STRING',
		description: 'the code to run',
		required: true,
	}],
	defaultPermission: false,
};
