/* eslint-disable @typescript-eslint/no-namespace */

import { join } from 'path';

export const rootFolder = join(__dirname, '..', '..', '..');
export const srcFolder = join(rootFolder, 'src');

export const enum Time {
	Millisecond = 1,
	Second = 1000,
	Minute = 1000 * 60,
	Hour = 1000 * 60 * 60,
	Day = 1000 * 60 * 60 * 24,
	Year = 1000 * 60 * 60 * 24 * 365
}
