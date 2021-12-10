"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
var local_api_1 = require("local-api");
var path_1 = __importDefault(require("path"));
exports.serveCommand = new commander_1.Command()
    //[] option <> Required Value
    .command('serve [filename]') //What command we want to watch for
    .description('Open a file for editing')
    .option('-p,--port <number>', 'port to run server on', '4005')
    .action(function (filename, options) {
    if (filename === void 0) { filename = 'notebook.js'; }
    var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename)); //Extracts the folder if a path is provided 
    //such from notes/notebook.js -> notes
    (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
}); //THis runs whenever serve command is called
