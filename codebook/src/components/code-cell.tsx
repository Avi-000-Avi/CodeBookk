import {useState, } from 'react';
import CodeEditor from './codeEditor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
    const [code,setCode] = useState('');
    const [input,setInput] = useState('');
 
    const onClick = async () =>{ 
        const output = await bundle(input);
        setCode(output);
    }
      return (
    <div>
      <CodeEditor 
      value="const a =1;" 
      onChange = {(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
       <Preview code ={code}/>
    </div>
  );
};

export default CodeCell;