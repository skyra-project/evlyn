/* eslint-disable @typescript-eslint/no-namespace */

/**
 * The presence types
 */
export enum PresenceType {
	/**
	 * The Online status
	 */
	Online = 'online',
	/**
	 * The Offline status
	 */
	Offline = 'offline',
	/**
	 * The Idle status
	 */
	Idle = 'idle',
	/**
	 * The Do Not Disturb status
	 */
	DoNotDisturb = 'dnd'
}

export namespace Mime {
	export const enum Types {
		ApplicationJson = 'application/json',
		ApplicationFormUrlEncoded = 'application/x-www-form-urlencoded',
		TextPlain = 'text/plain'
	}
}

export const enum APIErrors {
	UnknownAccount = 10001,
	UnknownApplication = 10002,
	UnknownChannel = 10003,
	UnknownGuild = 10004,
	UnknownIntegration = 10005,
	UnknownInvite = 10006,
	UnknownMember = 10007,
	UnknownMessage = 10008,
	UnknownOverwrite = 10009,
	UnknownProvider = 10010,
	UnknownRole = 10011,
	UnknownToken = 10012,
	UnknownUser = 10013,
	UnknownEmoji = 10014,
	UnknownWebhook = 10015,
	UnknownBan = 10026,
	BotProhibitedEndpoint = 20001,
	BotOnlyEndpoint = 20002,
	MaximumGuilds = 30001,
	MaximumFriends = 30002,
	MaximumPins = 30003,
	MaximumRoles = 30005,
	MaximumReactions = 30010,
	MaximumChannels = 30013,
	MaximumAttachments = 30015,
	MaximumInvites = 30016,
	Unauthorized = 40001,
	UserUnverified = 40002,
	UserBanned = 40007,
	MissingAccess = 50001,
	InvalidAccountType = 50002,
	CannotExecuteOnDM = 50003,
	EmbedDisabled = 50004,
	CannotEditMessageByOther = 50005,
	CannotSendEmptyMessage = 50006,
	CannotMessageUser = 50007,
	CannotSendMessagesInVoiceChannel = 50008,
	ChannelVerificationLevelTooHigh = 50009,
	Oauth2ApplicationBotAbsent = 50010,
	MaximumOauth2Applications = 50011,
	InvalidOauthState = 50012,
	MissingPermissions = 50013,
	InvalidAuthenticationToken = 50014,
	NoteTooLong = 50015,
	InvalidBulkDeleteQuantity = 50016,
	CannotPinMessageInOtherChannel = 50019,
	InvalidOrTakenInviteCode = 50020,
	CannotExecuteOnSystemMessage = 50021,
	CannotExecuteOnThisChannelType = 50024,
	InvalidOauthToken = 50025,
	InvalidRecipients = 50033,
	BulkDeleteMessageTooOld = 50034,
	InvalidFormBody = 50035,
	InviteAcceptedToGuildNotContainingBot = 50036,
	InvalidApiVersion = 50041,
	ReactionBlocked = 90001,
	ResourceOverloaded = 130000
}

export const PRESENCE_STATUS = [PresenceType.Online, PresenceType.Offline, PresenceType.Idle, PresenceType.DoNotDisturb];
