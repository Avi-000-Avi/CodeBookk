import './codeEditor.css';
import MonacoEditor,{EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import { useRef } from 'react';
//Refs can no only be be usef for getting a reference to a component but also to get a reference to any kind of 
//arbitrary value inside of a component and hold on a reference to it


//prettier has support for various languages If we want to parse specificallly js code we have to import a specific parser for it
import parser from 'prettier/parser-babel';
 

interface CodeEditorProps {
  value:string;
  onChange(value:string) :void;
}

const CodeEditor:React.FC<CodeEditorProps> = ({onChange,value}) => {
  const editorRef = useRef<any>();

  //WHen editor is first displayed  onEditorDidMount is called
  //First argument - to get curr value from the editor
  //Second - Reference to the editor itself so that we can call the getValue whenever we want so that whenever it changes we are calling getValue

    const onEditorDidMount:EditorDidMount = (getValue , monacoEditor) => {
      editorRef.current = monacoEditor;
      //When something inside the editor changes
      monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
      })

      monacoEditor.getModel()?.updateOptions({tabSize:2});
 
    }

  const onFormatClick = () => {
    //get curr value from editor
    const unformatteed = editorRef.current.getModel().getValue();

    //format the value
    const fromatted = prettier.format(unformatteed,{
      parser:'babel',
      plugins:[parser],
      useTabs:false,
      semi:true,
      singleQuote:true
    })

    //set the formatted value back in the editor
    editorRef.current.setValue(fromatted);
  }
  


  return (
    <div className="editor-wrapper">
    <button onClick = {onFormatClick} className="button button-format is-primary ">Format</button>

    <MonacoEditor
    editorDidMount={onEditorDidMount}
    value={value}
    theme="vs-dark"
    language="javascript"
      height="500px"
      options={{
        wordWrap: 'on',
        minimap:{enabled:false},
        showUnused:false,
        folding:false,
        lineNumbersMinChars:3,
        fontSize:16,
        scrollBeyondLastLine:false,
        automaticLayout:true,
      }}
    />
        </div>

  );
};

export default CodeEditor;