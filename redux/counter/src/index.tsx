import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { reducer } from './reducers'
import { Counter } from './components/Counter'

const store = createStore(reducer, 0);

const render = () => ReactDOM.render(
    <Counter value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })} />,

    document.getElementById('root')
);

render();
store.subscribe(render);