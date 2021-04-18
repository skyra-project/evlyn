// Config must be the first to be loaded, as it sets the env:
import '#root/config';

// Import everything else:
import '#utils/sanitizer/initClean';
import '@sapphire/plugin-logger/register';
import '@skyra/editable-commands';
import 'reflect-metadata';

import * as colorette from 'colorette';
import { inspect } from 'util';

inspect.defaultOptions.depth = 1;
colorette.options.enabled = true;
