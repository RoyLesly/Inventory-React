import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './Utils/store';

ReactDOM.render(<StoreProvider>
    <App />
</StoreProvider>, document.getElementById('root'));
