import MDEditor from '@uiw/react-md-editor';
import { useState,useEffect, useRef } from 'react';
import './text-editor.css';

const TextEditor:React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing,setEditing] = useState(false);
    const [value,setValue] = useState('Click on me');

    useEffect(() => {
        const listener = (event:MouseEvent) => {
            //Make sure we have a ref pointing to that div in other words see if the ref.current is defined
            //THat we actually clicked on an element that does exist
            //Whether what we clicked on was insdie of div
            if(ref.current && event.target && ref.current.contains(event.target as Node)){
               console.log('element clicked on is inside editor');
               return;
            }
            console.log('element clicked on is not inside editor');

            console.log(event.target);
            setEditing(false);
        };

        document.addEventListener('click',listener,{capture:true});
        return () => {
            document.removeEventListener('click',listener,{capture:true});
        }
    }, [])
    
    if(editing){
        return (
            <div className="text-editor" ref= {ref}>
                <MDEditor value={value} onChange={(v) => setValue(v || '')}/>
            </div>
        )
    }   

    return <div onClick = {() => setEditing(true)}>
        <MDEditor.Markdown source={value}/>
    </div>;
}
export default TextEditor;