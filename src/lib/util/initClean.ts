import { TOKEN } from '@root/config';
import { initClean } from '@utils/clean';

const raw = [TOKEN].filter((value) => typeof value === 'string' && value !== '');

initClean([...new Set(raw)]);
