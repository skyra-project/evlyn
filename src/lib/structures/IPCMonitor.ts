import { BasePiece } from '@sapphire/framework';

export abstract class IPCMonitor extends BasePiece {
	public abstract run(message: any): any;
}
