import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    //build represents the bundling process we can intereact or interfere certain parts of  the process with build argument by attaching event listeners to build
    setup(build: esbuild.PluginBuild) {
      //Overrides the process of esbuild  of figuring out where the file is  
      //Figure out what the actual path of the file is 
      //filter Regular expression for different onresolve or onload for css js jsx 
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
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
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        } 
      });
    },
  };
};