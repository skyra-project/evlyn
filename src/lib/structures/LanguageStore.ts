import { EvlynClient } from '@lib/EvlynClient';
import { Language } from './Language';
import { BaseStore } from '@sapphire/framework';

export class LanguageStore extends BaseStore<Language> {
	public constructor(client: EvlynClient) {
		super(client, Language, { name: 'languages' });
	}
}
