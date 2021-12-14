import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve =  (port:number,filename:string,dir:string,useProxy:boolean) => {
        const app = express();
        
        app.use(createCellsRouter(filename,dir));

        
        //while doing active development
        if(useProxy){
            //We can make a request from our browser over to our local api and  have it get routed automatically over  to our running react app development server
            //Whenever we recieve a request from the broswer that is not to fetch some cells or it's trying to save a list of cells then we will just assume it is some request
            //that is intended to go over to our create react app and get development files  so proxy that request to localhost 3000

            //We are using a proxy so we can access 
            app.use(createProxyMiddleware({
            target:'http://localhost:3000',
            ws:true,
            logLevel:'silent',
        }));
        }else
        {//WHile installed in a users machine
            //absolute path to get to that index.html file
            const packagePath = require.resolve('local-client/build/index.html');
            app.use(express.static(path.dirname(packagePath)));//we want path upto build directory     
        }


        //If everything goes well it will get resolved and it will work as it should be else if there's an error it will throw an error which can be caught in try catch block
        return new Promise<void>((resolve, reject) => {
            app.listen(port, resolve).on('error', reject);
          });
        };