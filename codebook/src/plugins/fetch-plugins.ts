import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage  from 'localforage';

const fileCache = localforage.createInstance({
  name:'filecache'
})


export const fetchPlugin = (inputCode:string) => {
    return {
        name:'fetchPlugin',
        setup(build:esbuild.PluginBuild){
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log('onLoad', args);
      
            if (args.path === 'index.js') {
      
                return {//Don't sweat it!!!Don't try to load  it off the file system we will return an object for you 
                  loader: 'jsx',
                  //that contains the contents  of the files you were trying to load
                  contents: inputCode 
                };
              } 
              //Check to see if we have already fetched this file
              //and if it is in the cache
              const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
      
              //if it is return it immediately
              if(cachedResult){
                return cachedResult;
              }
      
      
              const {data,request} = await axios.get(args.path);
              //store response in cache
      
              const result:esbuild.OnLoadResult =  {
                loader:'jsx',
                contents:data,
                //Will be Provided to the next file that we are trying to require and will describe where we found this original file 
                //Like /nested-test-pkg/src/
                resolveDir: new URL('./', request.responseURL).pathname,
              };
      
              await fileCache.setItem(args.path,result);
       
              return result;
            });
        }
    };
};