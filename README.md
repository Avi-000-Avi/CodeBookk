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


![alt text](https://github.com/Avi-000-Avi/CodeBookk/blob/main/Preview.png?raw=true)


## Three Biggest Challenges

1. Code will be provided as a string,We have to execute it safely in some way.
2. This code might have advanced JS syntax in it (like JSX) that your browser can't execute.
3. The code might have import statements for other JS files or CSS. We have to deal with those import statements before executing the code.



- Version :1.0.0
- License: MIT
