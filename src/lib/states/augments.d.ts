import type { StateMachine } from './StateMachine';

declare module '@sapphire/pieces' {
	export interface PieceContextExtras {
		states: StateMachine;
	}
}
