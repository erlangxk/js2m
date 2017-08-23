import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, initState } from './App';
import { createStore } from 'redux';

import { reducer } from './reducers/todolist';
import { Provider } from 'react-redux';

import './index.css';

const store = createStore(reducer, initState);

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
