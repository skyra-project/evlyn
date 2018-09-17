import { KlasaClient } from 'klasa';
import Manager from './ipc/Manager';

export default class Shyna extends KlasaClient {

	constructor({ dev = true, ...options }) {
		super(options);

		this.dev = dev;
		this.ipc = new Manager(this);
	}

}
