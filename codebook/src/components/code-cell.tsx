import { useState, useEffect } from 'react';
import CodeEditor from './codeEditor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  //Debouncing - Delaying a function 
  //If input changes , useeffect call happens settimeout is called and the bundle which was supposed to happen is delayed for 7.5 millisec
  //Next type input changes useeffect is called and settimoeut is called again with the new timer and the function is delayed again
  //It is only if the input is not called that the delayed function is called and bundling happens
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;