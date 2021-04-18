import { envParseBoolean } from '#lib/env';
import { ApplyOptions } from '@sapphire/decorators';
import { Event, EventOptions, Events } from '@sapphire/framework';

@ApplyOptions<EventOptions>({ enabled: envParseBoolean('STATE_MACHINE_ENABLED'), event: Events.Ready, once: true })
export class UserEvent extends Event<Events.Ready> {
	public run() {
		// TODO(kyranet): Populate the state machine

		this.context.states.start();
	}
}
