import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
await build({absWorkingDir:dirname(fileURLToPath(import.meta.url)),entryPoints:['src/macos-research.js'],bundle:true,minify:true,format:'esm',outfile:'macos-research.js',legalComments:'eof'});
