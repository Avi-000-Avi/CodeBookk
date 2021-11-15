import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDom from 'react-dom';
import TextEditor from './components/text-editor';

const App = () => {
      return (
    <div>
      <TextEditor/>
    </div>
  );
};

ReactDom.render(
    <App/>,
    document.querySelector('#root')
);