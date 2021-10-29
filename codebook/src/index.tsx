import {useState,useEffect,useRef} from 'react';
import ReactDom from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugins';

const App = () => {
    const ref = useRef<any>();
    const [input,setInput] = useState('');
    const [code,setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker:true,
            wasmURL:'/esbuild.wasm'
        });
    };
    useEffect(() => {
        startService();
    }, [])


    const onClick = async () =>{
        if(!ref.current){
            return;
        } 
        /*const result = await ref.current.transform(input,{
            //What kind of code are we transpiling
            loader:'jsx',
            target:'es2015'
        });
    */
        const result = await ref.current.build({
            entryPoints:['index.js'],
            bundle:true,
            write:false,
            plugins:[
                unpkgPathPlugin(),
                fetchPlugin(input),
            ],
            // provides a mechanism by which substrings within your code can be found-and-replaced at build time.
            define:{
                'process.env.NODE_ENV':'"production"',
                global:'window'
            }
        });
        
        setCode(result.outputFiles[0].text);
    }

    return <div>
        <textarea value = {input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}> Submit</button>
        </div>
        <pre>{code}</pre>
    </div>;

};

ReactDom.render(
    <App/>,
    document.querySelector('#root')
);