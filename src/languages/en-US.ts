/* eslint-disable @typescript-eslint/no-invalid-this */
import { Language, LanguageKeys } from 'klasa';

const PERMS = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'View Audit Log',
	MANAGE_GUILD: 'Manage Server',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_CHANNELS: 'Manage Channels',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	CREATE_INSTANT_INVITE: 'Create Instant Invite',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_EMOJIS: 'Manage Emojis',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	VIEW_CHANNEL: 'Read Messages',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention Everyone',
	USE_EXTERNAL_EMOJIS: 'Use External Emojis',
	ADD_REACTIONS: 'Add Reactions',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	STREAM: 'Stream',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use Voice Activity',
	PRIORITY_SPEAKER: 'Priority Speaker'
};

const list = (values: readonly string[], conjuction: 'or' | 'and') => {
	switch (values.length) {
		case 0:
			return '';
		case 1:
			return values[0];
		case 2:
			return `${values[0]} ${conjuction} ${values[1]}`;
		default: {
			const trail = values.slice(0, -1);
			const head = values[values.length - 1];
			return `${trail.join(', ')}, ${conjuction} ${head}`;
		}
	}
};

export default class extends Language {
	public language: LanguageKeys = {
		default: ({ key }) => `${key} has not been localized for en-US yet.`,
		defaultLanguage: 'Default Language',
		settingGatewayKeyNoext: ({ key }) => `The key "${key}" does not exist in the data schema.`,
		settingGatewayChooseKey: ({ keys }) => `You cannot edit a settings group, pick any of the following: "${keys.join('", "')}"`,
		settingGatewayUnconfigurableFolder: 'This settings group does not have any configurable sub-key.',
		settingGatewayUnconfigurableKey: ({ key }) => `The settings key "${key}" has been marked as non-configurable by the bot owner.`,
		settingGatewayMissingValue: ({ entry, value }) =>
			`The value "${value}" cannot be removed from the key "${entry.path}" because it does not exist.`,
		settingGatewayDuplicateValue: ({ entry, value }) =>
			`The value "${value}" cannot be added to the key "${entry.path}" because it was already set.`,
		settingGatewayInvalidFilteredValue: ({ entry, value }) => `The settings key "${entry.path}" does not accept the value "${value}".`,
		resolverMultiTooFew: ({ name, min = 1 }) => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
		resolverInvalidBool: ({ name }) => `${name} must be true or false.`,
		resolverInvalidChannel: ({ name }) => `${name} must be a channel tag or valid channel id.`,
		resolverInvalidCustom: ({ name, type }) => `${name} must be a valid ${type}.`,
		resolverInvalidDate: ({ name }) => `${name} must be a valid date.`,
		resolverInvalidDuration: ({ name }) => `${name} must be a valid duration string.`,
		resolverInvalidEmoji: ({ name }) => `${name} must be a custom emoji tag or valid emoji id.`,
		resolverInvalidFloat: ({ name }) => `${name} must be a valid number.`,
		resolverInvalidGuild: ({ name }) => `${name} must be a valid guild id.`,
		resolverInvalidInt: ({ name }) => `${name} must be an integer.`,
		resolverInvalidInvite: ({ name }) => `${name} must be a valid invite link.`,
		resolverInvalidLiteral: ({ name }) => `Your option did not match the only possibility: ${name}`,
		resolverInvalidMember: ({ name }) => `${name} must be a mention or valid user id.`,
		resolverInvalidMessage: ({ name }) => `${name} must be a valid message id.`,
		resolverInvalidPiece: ({ name, piece }) => `${name} must be a valid ${piece} name.`,
		resolverInvalidRegexMatch: ({ name, pattern }) => `${name} must follow this regex pattern \`${pattern}\`.`,
		resolverInvalidRole: ({ name }) => `${name} must be a role mention or role id.`,
		resolverInvalidString: ({ name }) => `${name} must be a valid string.`,
		resolverInvalidTime: ({ name }) => `${name} must be a valid duration or date string.`,
		resolverInvalidUrl: ({ name }) => `${name} must be a valid url.`,
		resolverInvalidUser: ({ name }) => `${name} must be a mention or valid user id.`,
		resolverInvalidSnowflake: ({ name }) => `${name} must be a valid Discord snowflake.`,
		resolverInvalidStore: ({ store }) => `${store} must be a valid Store.`,
		resolverStringSuffix: ' characters',
		resolverMinmaxExactly: ({ name, min }) => `${name} must be exactly ${min}.`,
		resolverMinmaxBoth: ({ name, min, max, inclusive }) =>
			inclusive ? `${name} must be between ${min} and ${max} inclusively.` : `${name} must be between ${min} and ${max} exclusively.`,
		resolverMinmaxMin: ({ name, min, inclusive }) =>
			inclusive ? `${name} must be greater than ${min} inclusively.` : `${name} must be greater than ${min} exclusively.`,
		resolverMinmaxMax: ({ name, max, inclusive }) =>
			inclusive ? `${name} must be less than ${max} inclusively` : `${name} must be less than ${max} exclusively.`,
		reactionhandlerPrompt: 'Which page would you like to jump to?',
		commandmessageMissing: 'Missing one or more required arguments after end of input.',
		commandmessageMissingRequired: ({ name }) => `${name} is a required argument.`,
		commandmessageMissingOptionals: ({ possibles }) => `Missing a required option: (${possibles})`,
		commandmessageNomatch: ({ possibles }) => `Your option didn't match any of the possibilities: (${possibles})`,
		monitorCommandHandlerReprompt: ({ tag, name, time, cancelOptions }) =>
			`${tag} | **${name}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${cancelOptions.join(
				'**, **'
			)}** to abort this prompt.`,
		monitorCommandHandlerRepeatingReprompt: ({ tag, name, time, cancelOptions }) =>
			`${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join(
				'**, **'
			)}** to cancel this prompt.`,
		messagePromptTimeout: 'The prompt has timed out.',
		monitorCommandHandlerAborted: 'Aborted',
		prefixReminder: ({ prefix }) => `The prefix in this guild is set to: \`${prefix}\``,
		commandEvalDescription: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
		commandEvalExtended: [
			`The eval command evaluates code as-in, any error thrown from it will be handled.`,
			`It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.`,
			`The --wait flag changes the time the eval will run. Defaults to 10 seconds. Accepts time in milliseconds.`,
			`The --output and --output-to flag accept either 'file', 'log', 'haste' or 'hastebin'.`,
			`The --delete flag makes the command delete the message that executed the message after evaluation.`,
			`The --silent flag will make it output nothing.`,
			`The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.`,
			`The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword`,
			`The --showHidden flag will enable the showHidden option in util.inspect.`,
			`The --lang and --language flags allow different syntax highlight for the output.`,
			`The --json flag converts the output to json`,
			`The --no-timeout flag disables the timeout`,
			`If the output is too large, it'll send the output as a file, or in the console if the bot does not have the ${PERMS.ATTACH_FILES} permission.`
		].join('\n'),

		commandEvalTimeout: ({ seconds }) => `TIMEOUT: Took longer than ${seconds} seconds.`,
		commandEvalError: ({ time, output, type }) => `**Error**:${output}\n**Type**:${type}\n${time}`,
		commandExecDescription: 'Execute Order 66.',
		commandExecExtended: 'You better not know about this.',
		systemExceededLengthOutput: ({ output, time, type }) =>
			`**Output**:${output}${type !== undefined && time !== undefined ? `\n**Type**:${type}\n${time}` : ''}`,
		systemExceededLengthOutputConsole: ({ time, type }) =>
			`Sent the result to console.${type !== undefined && time !== undefined ? `\n**Type**:${type}\n${time}` : ''}`,
		systemExceededLengthOutputFile: ({ time, type }) =>
			`Sent the result as a file.${type !== undefined && time !== undefined ? `\n**Type**:${type}\n${time}` : ''}`,
		systemExceededLengthOutputHastebin: ({ url, time, type }) =>
			`Sent the result to hastebin: ${url}${type !== undefined && time !== undefined ? `\n**Type**:${type}\n${time}` : ''}`,
		systemExceededLengthChooseOutput: ({ output }) => `Choose one of the following options: ${list(output, 'or')}`
	};

	public async init() {
		// noop
	}
}
