import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';

import {createStore} from 'redux';
// import reducers from './modules';
import {Provider} from 'react-redux';

// store 생성
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
