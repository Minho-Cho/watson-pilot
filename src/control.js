import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';

const rootElement = document.getElementById('root');
ReactDOM.render(<App headerTitle = "Welcome!"
                     contentBody = "Welcome to example"/>, rootElement);
