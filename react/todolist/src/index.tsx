import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, initState } from './App';
import { createStore } from 'redux';

import { reducer } from './reducers/todolist';

import './index.css';

const store = createStore(reducer, initState);

function render() {
    ReactDOM.render(<App store={store} />, document.getElementById('root') as HTMLElement);
}

store.subscribe(render);
render();