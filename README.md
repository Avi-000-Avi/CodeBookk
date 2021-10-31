# TypescriptwithRedux

![alt text](https://github.com/Avi-000-Avi/TypescriptwithRedux/blob/main/2.png)
![alt text](https://github.com/Avi-000-Avi/TypescriptwithRedux/blob/main/3.png)
![alt text](https://github.com/Avi-000-Avi/TypescriptwithRedux/blob/main/4.png)
![alt text](https://github.com/Avi-000-Avi/TypescriptwithRedux/blob/main/5.png)

# A CLI to launch an interactive development environment for writing and documenting code inside the browser

Executing user's code in a preview window

Take that code in the CodeEditor Component and communicate with the preview component.

## Three Big Challenges

1. Code will be provided as a string,We have to execute it safely in some way.
2. This code might have advanced JS syntax in it (like JSX) that your browser can't execute.
3. The code might have import statements for other JS files or CSS. We have to deal with those import statements before executing the code.

Safely execute teh js in the browser by running a transpiler. A tool that will some code that strip out any features or any syntax that are not widely supported by browsers.
SOmething about transpilers

Problem#2 would be solved if we could get Babel working in our React app

Transpiling Options
#1 Remote Transpiling -> Remote api backend where we will do the transpiling
#2 Babel Directly in the brower - Running in browser - Transpiling right in the app

Webpack with ES Modules
Remote + Local
Webpack Replacement

Raw user code -> Babel/Transpiling(Works in the Browser) -> Webpack/Bundling(Does'nt work in the browser) -> Code Ready to execute

Webpack does'nt run in the browser

ESBuild -> Can Transpile + bundle all in the browser

esbuild NPM module is written in go

ESBuild you are passing the command to the JS wrapper which passes it to the GO executable that acutally does the

[Module Bundlers Explained... Webpack, Rollup, Parcel, and Snowpack](https://www.youtube.com/watch?v=5IG4UmULyoA&t=261s)

[Why Are People Obsessed With ESBuild?](https://www.youtube.com/watch?v=9XS_RA6zyyU)

WE installed ESBuild -wasm
wasm -web assembly allows you to execute compile C++ C# Go  
NPM module that give a small amount of JS that which we interact with and tell it to transpile some code
But it is not responsible for the actual heavy lifting instead this process is delegated to wasm binary which is the actual go lang bundler compiled to work in the browser
https://esbuild.github.io/api/#transform-api
https://esbuild.github.io/api/#build-api

Has JS wrapper around the actual go code that transpiles and bundles
esbuild.wasm copy from node modules to public
we need this stuff in our browser.We need to load it some way. Everything in the public directory can be easily fetched in the browser

//Caching for Perfromance Gains
Crazy Number of Requests -
Impelementing caching Layer
Caching with key value pairs
Bundling user input
Breaking up resolve logic wiht filters
Refactoring to multiple plugins
Loading css
Configuring COrrect Loader

Small shortcoming wiht Esbuild

Inside the documentation we had read that whenever esBuild does some bundling, if we import css esBuild is going to spit out two separate files, one file containing all of our JavaScript code and also a second file containing all this css.
At present, we are not attempting to save the output to some file whenever we do our bundling process.
We are not specifying that we should write out any output to any file on our file system, because remember,that's the whole problem around running a bundler We do not have a file system. 

Unfortunately, we can only spit out JavaScript directly from the bundle if we are not writing anything to the hard disk, if we're not actually writing to a file.
So how are we going to fix this?We're going to wrap it inside of some JavaScript and we're going to use that JavaScript to automatically

Tricking ESBuild's CSS Handling

If we are running esbuild from commandline or nodejs server then esbuild has somewhere to write some output files it could spit out js and css
We are taking everything from 
we would create a style element and take all the css stick to style tag and append the style tag onto  head tag in our html document

 const contents = fileType === 'css' ?
              `
                const style = document.createElement('style');
                style.innerText = 'body {background-color:"red"}';
                document.head.appendChild(style);
              `:data;

Escaping CSS Snippets
Separate LOad Filters
Extracting Common Caching Logic
