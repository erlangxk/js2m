import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { reducer } from './reducers'
import { Counter } from './components/Counter'

import { connect, Provider } from 'react-redux'

const store = createStore(reducer, 0);
function mapStateToProps(state: number) {
    return { value: state };
}

function mapDispatchToProps(dispatch: any) {
    return {
        onIncrement: () => dispatch({ type: 'INCREMENT' }),
        onDecrement: () => dispatch({ type: 'DECREMENT' }),
    }
}

const CounterX=connect(mapStateToProps, mapDispatchToProps)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <CounterX />
    </Provider>, document.getElementById('root')
);