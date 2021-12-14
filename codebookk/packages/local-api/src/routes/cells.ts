import express from 'express';
import fs from 'fs/promises';//for saving and loading files from harddrive
import path from 'path';

interface Cell{
    id:string;
    content:string;
    type:'text' | 'code';
}

export const createCellsRouter = (filename:string,dir:string) => {
    const router = express.Router();

    router.use(express.json());

    const fullPath = path.join(dir,filename);

    router.get('/cells',async (req,res) => {

    
        //Read the file
        try {
            //Read the file
            const result = await fs.readFile(fullPath,{encoding:'utf-8'});

            res.send(JSON.parse(result));
        }   catch (err: unknown) {
            if (err instanceof Error) {
              console.log('Heres the problem --->', err.message);
              await fs.writeFile(fullPath,'[]','utf-8');
              res.send([]);
            }
        }

        //If read throws an error
        //Inspect the error
        //Parse a list of cells out of it
        //Send list of cells back to browser
    });
    
    
    router.post('/cells',async (req,res) => {

        //Take the list of cells from the request obj
        //Serialize them turn into a format that can be safely written in the file
        const {cells}:{cells:Cell[]}  = req.body;


        //write the cells from the file
        await fs.writeFile(fullPath,JSON.stringify(cells),'utf-8');

        res.send({status:'ok'});
    
    });

    return router;
}
