/* eslint-disable @typescript-eslint/unified-signatures */
import { exec as childProcessExec } from 'child_process';
import { promisify } from 'util';

/**
 * Promisified version of child_process.exec for use with await
 * @param command The command to run
 * @param options The options to pass to exec
 */
export const exec = promisify(childProcessExec);
