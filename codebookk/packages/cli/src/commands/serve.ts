import { Command } from "commander";
import { serve } from "@codebookk/local-api";
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
//[] option <> Required Value
    .command('serve [filename]')//What command we want to watch for
    .description('Open a file for editing')
    .option('-p,--port <number>','port to run server on','4005')
    .action(async (filename = 'notebook.js',options:{port:string}) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir,!isProduction);
            console.log(
              `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
            );
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.log('Heres the problem --->', err.message);
            }

            //if we fail to start our server end this command (forcibly exit the process)
            process.exit(1);
          }
        
    });//THis runs whenever serve command is called
 