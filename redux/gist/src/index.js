import {
    createStore,
    applyMiddleware
} from 'redux'

function counter(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const increment = {
    type: 'INCREMENT'
};
const decrement = {
    type: 'DECREMENT'
};

function createAction(type) {
    return {
        type
    }
}


const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

let store = createStore(counter, 1000, applyMiddleware(logger));
store.subscribe(() => console.log(store.getState()));

store.dispatch(increment);
store.dispatch(increment);
store.dispatch(increment);
store.dispatch(increment);
store.dispatch(decrement);
store.dispatch(createAction('unknown'));