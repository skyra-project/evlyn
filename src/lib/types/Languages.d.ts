import type { SchemaEntry } from 'klasa';

declare module 'klasa' {
	export interface LanguageKeys {
		default: (params: { key: string }) => string;
		defaultLanguage: string;
		settingGatewayKeyNoext: (params: { key: string }) => string;
		settingGatewayChooseKey: (params: { keys: string[] }) => string;
		settingGatewayUnconfigurableFolder: string;
		settingGatewayUnconfigurableKey: (params: { key: string }) => string;
		settingGatewayMissingValue: (params: { entry: SchemaEntry; value: string }) => string;
		settingGatewayDuplicateValue: (params: { entry: SchemaEntry; value: string }) => string;
		settingGatewayInvalidFilteredValue: (params: { entry: SchemaEntry; value: unknown }) => string;
		resolverMultiTooFew: (params: { name: string; min?: number }) => string;
		resolverInvalidBool: (params: { name: string }) => string;
		resolverInvalidChannel: (params: { name: string }) => string;
		resolverInvalidCustom: (params: { name: string; type: string }) => string;
		resolverInvalidDate: (params: { name: string }) => string;
		resolverInvalidDuration: (params: { name: string }) => string;
		resolverInvalidEmoji: (params: { name: string }) => string;
		resolverInvalidFloat: (params: { name: string }) => string;
		resolverInvalidGuild: (params: { name: string }) => string;
		resolverInvalidInt: (params: { name: string }) => string;
		resolverInvalidInvite: (params: { name: string }) => string;
		resolverInvalidLiteral: (params: { name: string }) => string;
		resolverInvalidMember: (params: { name: string }) => string;
		resolverInvalidMessage: (params: { name: string }) => string;
		resolverInvalidPiece: (params: { name: string; piece: string }) => string;
		resolverInvalidRegexMatch: (params: { name: string; pattern: string }) => string;
		resolverInvalidRole: (params: { name: string }) => string;
		resolverInvalidString: (params: { name: string }) => string;
		resolverInvalidTime: (params: { name: string }) => string;
		resolverInvalidUrl: (params: { name: string }) => string;
		resolverInvalidUser: (params: { name: string }) => string;
		resolverInvalidSnowflake: (params: { name: string }) => string;
		resolverInvalidStore: (params: { store: string }) => string;
		resolverStringSuffix: string;
		resolverMinmaxExactly: (params: { name: string; min: number }) => string;
		resolverMinmaxBoth: (params: { name: string; min: number; max: number; inclusive: boolean }) => string;
		resolverMinmaxMin: (params: { name: string; min: number; inclusive: boolean }) => string;
		resolverMinmaxMax: (params: { name: string; max: number; inclusive: boolean }) => string;
		reactionhandlerPrompt: string;
		commandmessageMissing: string;
		messagePromptTimeout: string;
		prefixReminder: (params: { prefix: string }) => string;
		commandmessageMissingRequired: (params: { name: string }) => string;
		commandmessageMissingOptionals: (params: { possibles: string }) => string;
		commandmessageNomatch: (params: { possibles: string }) => string;
		monitorCommandHandlerReprompt: (params: { tag: string; name: string; time: string; cancelOptions: readonly string[] }) => string;
		monitorCommandHandlerRepeatingReprompt: (params: { tag: string; name: string; time: string; cancelOptions: readonly string[] }) => string;
		monitorCommandHandlerAborted: string;
		commandEvalTimeout: (params: { seconds: number }) => string;
		commandEvalError: (params: { time: string; output: string; type: string }) => string;
		commandEvalDescription: string;
		commandEvalExtended: string;
		commandExecDescription: string;
		commandExecExtended: string;

		systemExceededLengthOutput: (params: { output: string; time?: string; type?: string }) => string;
		systemExceededLengthOutputConsole: (params: { time?: string; type?: string }) => string;
		systemExceededLengthOutputFile: (params: { time?: string; type?: string }) => string;
		systemExceededLengthOutputHastebin: (params: { url: string; time?: string; type?: string }) => string;
		systemExceededLengthChooseOutput: (params: { output: string[] }) => string;
	}
}
