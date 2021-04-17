import { initClean } from '#utils/sanitizer/clean';
import { isNullish } from '@sapphire/utilities';

const secrets = new Set<string>();
for (const [key, value] of Object.entries(process.env)) {
	if (isNullish(value) || value.length === 0) continue;

	// _TOKEN keys
	if (key.endsWith('_TOKEN')) secrets.add(value);
	else if (key.endsWith('_SECRET')) secrets.add(value);
	else if (key.endsWith('_PASSWORD')) secrets.add(value);
}

initClean([...secrets]);
