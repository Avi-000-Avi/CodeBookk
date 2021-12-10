import { Command } from "commander";
import { serve } from "local-api";
import path from 'path';

export const serveCommand = new Command()
//[] option <> Required Value
    .command('serve [filename]')//What command we want to watch for
    .description('Open a file for editing')
    .option('-p,--port <number>','port to run server on','4005')
    .action((filename = 'notebook.js',options:{port:string}) => {
        const dir = path.join(process.cwd(),path.dirname(filename));//Extracts the folder if a path is provided 
        //such from notes/notebook.js -> notes
        
        serve(parseInt(options.port),path.basename(filename),dir);
    });//THis runs whenever serve command is called
 