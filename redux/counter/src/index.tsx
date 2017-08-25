import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';
import { Counter } from './components/Counter';

import { connect, Provider } from 'react-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import 'rxjs';

const asyncEpic = (action$: any) => action$.ofType('INCREMENT_ASYNC').delay(1000).mapTo({ type: 'INCREMENT' });
const oddEpic = (action$: any, store: any) => action$.ofType('INCREMENT_IF_ODD').filter(() => store.getState() % 2 == 1).mapTo({ type: 'INCREMENT' });
const rootEpic = combineEpics(asyncEpic, oddEpic);

const middleweare = createEpicMiddleware(rootEpic);

const store = createStore(reducer, 0, applyMiddleware(middleweare));
function mapStateToProps(state: number) {
    return { value: state };
}

function mapDispatchToProps(dispatch: any) {
    return {
        onIncrement: () => dispatch({ type: 'INCREMENT' }),
        onDecrement: () => dispatch({ type: 'DECREMENT' }),
        incrementAsync: () => dispatch({ type: 'INCREMENT_ASYNC' }),
        incrementIfOdd: (value: number) => dispatch({ type: 'INCREMENT_IF_ODD' })
    }
}

const CounterX = connect(mapStateToProps, mapDispatchToProps)(Counter);


ReactDOM.render(
    <Provider store={store}>
        <CounterX />
    </Provider>, document.getElementById('root')
);