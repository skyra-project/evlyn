import { promisify } from 'util';

/**
 * Promisified version of setTimeout for use with await
 * @param delay The amount of time in ms to delay
 * @param args Any args to pass to the .then (mostly pointless in this form)
 */
export const sleep = promisify(setTimeout);
