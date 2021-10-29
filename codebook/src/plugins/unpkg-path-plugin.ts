import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    //build represents the bundling process we can intereact or interfere certain parts of  the process with build argument by attaching event listeners to build
    setup(build: esbuild.PluginBuild) {
      //Overrides the process of esbuild  of figuring out where the file is  
      //Figure out what the actual path of the file is 
      //filter Regular expression for different onresolve or onload for css js jsx 
    build.onResolve({ filter: /.*/ }, async (args: any) => {
      console.log('onResolve', args);
      if (args.path === 'index.js') {
        return { path: args.path, namespace: 'a' };
      }

        //Url constructore
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      //PAth generated by onResolve Loads 
      //Don't let it do it's normal thing
    build.onLoad({ filter: /.*/ }, async (args: any) => {
      console.log('onLoad', args);

      if (args.path === 'index.js') {

          return {//Don't sweat it!!!Don't try to load  it off the file system we will return an object for you 
            loader: 'jsx',
            //that contains the contents  of the files you were trying to load
            contents: `
              import React,{useState} from 'react';
              console.log(React,useState);
            `,
          };
        } 

        const {data,request} = await axios.get(args.path);
        return {
          loader:'jsx',
          contents:data,
          //Will be Provided to the next file that we are trying to require and will descirbe where we found this original file 
          //Like /nested-test-pkg/src/
          resolveDir: new URL('./', request.responseURL).pathname,
        }
      });
    },
  };
};