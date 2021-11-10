
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugins';

let service:esbuild.Service;

export default async(rawCode:string) => {
    //if this is the first time we are calling the above function initialize esbuild don't need to reinitialize every time we call it
    if(!service){
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
          });
    }

    const result = await service.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      });

    return result.outputFiles[0].text;
};