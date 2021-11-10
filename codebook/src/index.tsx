import 'bulmaswatch/superhero/bulmaswatch.min.css';
import {useState, } from 'react';
import ReactDom from 'react-dom';
import CodeEditor from './components/codeEditor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
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

ReactDom.render(
    <App/>,
    document.querySelector('#root')
);