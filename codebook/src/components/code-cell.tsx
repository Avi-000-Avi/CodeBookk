import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';
import {useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  //Code of current and all previous code cells
  const cumulativeCode = useCumulativeCode(cell.id);

  //Debouncing - Delaying a function 
  //If input changes , useeffect call happens settimeout is called and the bundle which was supposed to happen is delayed for 7.5 millisec
  //Next type input changes useeffect is called and settimoeut is called again with the new timer and the function is delayed again
  //It is only if the input is not called that the delayed function is called and bundling happens
  
  
  useEffect(() => {
    if (!bundle) {
      //cumulativeCode.join('\n') -> take array of strings and break them into a long string divided by newline so that the whole code could be like a one file written in different lines 
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
    <div
      style={{
        height: 'calc(100% - 10px)',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Resizable direction="horizontal">
        <CodeEditor
          initialValue={cell.content}
          onChange={(value) => updateCell(cell.id, value)}
        />
      </Resizable>
      <div className="progress-wrapper">
        {!bundle || bundle.loading ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </div>
  </Resizable>
  );
};

export default CodeCell;