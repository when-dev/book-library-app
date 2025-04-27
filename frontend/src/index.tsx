import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './redux/store' 
import App from './App';
import './index.css';
import React from 'react'

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root container not found');
}

const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
  

