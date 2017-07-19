import * as React from 'react';

export function Counter(props: { value: number, onIncrement: () => void, onDecrement: () => void }) {
  function incrementIfOdd() {
    if (props.value % 2 != 0) {
      props.onIncrement()
    }
  }

  function incrementAsync() {
    setTimeout(props.onIncrement, 3000);
  }

  return (
    <p>
      Clicked: {props.value} times
        {' '}
      <button onClick={props.onIncrement}>
        +
        </button>
      {' '}
      <button onClick={props.onDecrement}>
        -
        </button>
      {' '}
      <button onClick={incrementIfOdd}>
        Increment if odd
        </button>
      {' '}
      <button onClick={incrementAsync}>
        Increment async
        </button>
    </p>
  )
}