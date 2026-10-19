import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
await build({absWorkingDir:dirname(fileURLToPath(import.meta.url)),entryPoints:['src/workspace.tsx'],bundle:true,minify:true,outfile:'workspace.js',define:{'process.env.NODE_ENV':'"production"'},jsx:'automatic',legalComments:'eof'});
