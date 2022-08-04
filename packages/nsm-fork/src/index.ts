import * as fs from 'fs';
import { join } from 'path';
import { argv } from 'yargs';

import createManifest from './createManifest';
import { encode } from './utils';

const fileName = (argv.fileName as string) || 'next-static-manifest';

const entryManifest = join('functions', `${fileName}.json`);

const routes = createManifest();

fs.writeFile(entryManifest, encode(routes), function (err) {
  if (err) throw err;

  console.log('Next.js static manifest created');
  return;
});
