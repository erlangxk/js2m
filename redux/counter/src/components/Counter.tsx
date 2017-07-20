import * as React from 'react';
interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementAsync: () => void;
}

export function Counter(props: CounterProps) {
  function incrementIfOdd() {
    if (props.value % 2 != 0) {
      props.onIncrement()
    }
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
      <button onClick={props.incrementAsync}>
        Increment async
        </button>
    </p>
  )
}