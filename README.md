# CodeBookk

> A CLI to launch an interactive browser-based coding environment like a Jupyter Notebook, but for Javascript, with many additional features added in.
Bundling and transpiling code directly in the browser. This is a task normally done by running Webpack and Babel at your terminal! You will execute users' code safely in the browser just like how famous services like CodeSandBox and CodePen do. 

### To Do
> Deploy this project using a multi-package architecture to NPM, where others can easily download and run your project.

## Goals Completed

    Used React, Redux, and Typescript together

    Built a complex and interesting app using a package-based architecture

    Understood the challenges of in-browser code transpiling and and processing

    Secured the app against potential security exploits

    Safely execute user-provided code directly in the browser

    Run a code editor directly in the browser - the same editor used by VSCode!

    Leveraged Web Assembly to run a code bundler directly in the browser at lightning-fast speeds



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

```
             const contents = fileType === 'css' ?
              ` const style = document.createElement('style');
                style.innerText = 'body {background-color:"red"}';
                document.head.appendChild(style);
              `:data;
```
Escaping CSS Snippets
Separate LOad Filters
Extracting Common Caching Logic

### Code will be provided to Preview as a strin. We have to execute it safely.

After we click we run our bundler and after transpiling we store it to a state we can use  eval() to execute that transpiler code.

Well, the first most obvious thing that might occur is a user might do something like this.
They might make a very simple typo of something like console, dot, blah, blah, blah, blah, instead of console.log.This code right here can definitely be transpired and bundled without any issue whatsoever.However, when we start to execute the code, well, we start to get an error because that is definitely not a function.
Solution try and catch block. But this fails for asynchronous code. Like if we put a timer to that block.

Well, there's the problem whenever we do a try catch around some block of code, that code is executed and in that instant that it is executed, we watch for an error.As soon as that code is executed, we then exit out of the try catch block and life continues as usual. if the user ever write some kind of asynchronous code inside their application and it throws an error,well, once again, everything crashes.


Do you think about here first off, first big problem is that whenever we run a user's code, it might throw some kind of error.
Second big problem, a user might give us some code to run, it will somehow mutate the DOM and once again, if user starts changing the DOM, it might cause our program to crash.
Like empty the body so whole site goes blank 
we will only let the user to execute it's code in the preview iframe not more we don't want that code to change what's in the app what the user can see the dom we are not letting the user interact with it

SOLUTION --- Iframe

DIrect access between frames is allowed when
The iframe element does not have a sandbox property or has a sandbox = aloow-same-origin property
And
We fetch the parent HTML doc and the frame HTML doc from the exact same Domain Port Protocol(http vs https)

How codepen and Codesandbox work?
After the code is transpiled send back the iframe is reloaded 
THe html is fetched from a different domain


![alt text](https://github.com/Avi-000-Avi/CodeBookk/blob/main/img/SafelyExecution/1.png)
![alt text](https://github.com/Avi-000-Avi/CodeBookk/blob/main/img/SafelyExecution/2.png)
![alt text](https://github.com/Avi-000-Avi/CodeBookk/blob/main/img/SafelyExecution/3.png)
![alt text](https://github.com/Avi-000-Avi/CodeBookk/blob/main/img/SafelyExecution/4.png)


Refresh the contents of the HTML after every execution
Let's say the user does something like
``` document.body.innerHTML('#root') = '';
``` This erases the div and the next time if the user tries something like 

```
console.log(document.querySelector(#root));
```
Will give an error. 
To fix that we we will reset the contents of the iframe to what it was after clicking the submit button.

##Displaying React COde

We can't just have a submit button we want to bundle an execute with every key press but this is very cpu intensive.Bundling is pretty computationally impressive.
Maybe the user stops after half a second we want to bundle then


[jscodeshift - Parse js code](https://www.toptal.com/javascript/write-code-to-rewrite-your-code
)

https://www.digitalprimates.net/blog/what-values-should-be-returned-when-using-useeffect-in-react/#:~:text=Based%20on%20the%20information%20from,any%20value%2C%20implicitly%20returning%20undefined.

```
const {id,content} = action.payload;
            return {
                //Returning a new object which has all features of the state
                ...state,
                data: {
                    //Have data of all other cells
                    //But override the particular cell with id returned in the action payload
                    //Extract all properties of this cell  and only  change content property of this object
                    ...state.data,
                    [id]:{
                        ...state.data[id],
                        content,
                    } 
                }
            };
```

Immerautomatically detects the changes we made to the state and returns a state object to us we don't have to return a state object

```
const {id,content} = action.payload;
state.data[id].content = content;
```

### Redux Selector 

#useMemo
https://www.youtube.com/watch?v=THL1OPn72vo

goal of our local API is.
It takes a long time to start up because we have to start up all the code transpiring, all the bundling,all that kind of stuff and all that set up and start up.
So whenever a user is running the local API.
The first route that we're going to put together inside there is a route that's going to fetch all the built production assets for our react application.
So, for example, if the user makes a request to just localhost at Port 40 or 50 or whatever or our  local API is running on, we're going to send them back the indexed HTML file from our reactor application.  That HTML file will load up inside the user's browser. There will, of course, be a couple of script tags inside of there in the browser, will make some additional requests to go and get those additional JavaScript files from our local API.
API is serving all the production assets of our REACT application, not just the indexed HTML file.


Allow a browser to make a request to something like get on cells whenever a user makes a request like this, we're going to take a look at all the cells inside of the file. And remember, that is the name, the file that was provided to the CLI. We're going to take all the cells of  that file and send them back over to the browser. So in this case, would be something like an array of cell objects and remember, every cell has an ID content and type not so type here, but it does exist.

A user in their browser should be able to make a change to a cell. Whenever they do, we want to take the updated list of cells, post them to something like cells. And our local API is going to take that list of cells and store them into a file. And that is the same file that was provided when user ran that book server command.

## Install Dependencies

```
npm install
```

## Run App

```
# Run in development mode
npm run dev

```

- Version :1.0.0
- License: MIT
