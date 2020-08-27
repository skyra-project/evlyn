import { Structures } from 'discord.js';
import type { TFunction } from 'i18next';
import type { Language } from '@lib/structures/Language';

Structures.extend(
	'Message',
	(Message) =>
		class EvlynMessage extends Message {
			public get language(): Language {
				return this.client.languages.get('en-US')!;
			}

			public sendTranslated(...args: Parameters<TFunction>) {
				const content = this.language.get(...args);
				return this.channel.send(content);
			}
		}
);
