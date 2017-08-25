import * as React from 'react';
interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementAsync: () => void;
  incrementIfOdd: (value: number) => void;
}

export function Counter(props: CounterProps) {

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
      <button onClick={() => props.incrementIfOdd(props.value)}>
        Increment if odd
        </button>
      {' '}
      <button onClick={props.incrementAsync}>
        Increment async
        </button>
    </p>
  )
}