import * as React from 'react';
import { TodoListU } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { InputRow } from './components/InputRow';
import { StatusRow, Filter } from './components/StatusRow';
import { Actions, filterItems, numOfActiveItems } from './reducers/todolist';

export const initState = {
  items: [new TodoItem('idsfsfsfsf', 'text1', true), new TodoItem('id2', 'textssssssssssssss', false)],
  filter: Filter.All
};

export function App(props: { store: any }) {
  let input: HTMLInputElement | undefined = undefined;

  function handleClick(todoItem: TodoItem) {
    props.store.dispatch({ type: Actions.ToggleItem, itemId: todoItem.id });
  }

  function handleAddTodo(value: string) {
    props.store.dispatch({ type: Actions.AddItem, text: value });
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && input) {
      let text = input.value;
      if (text) {
        handleAddTodo(text);
        input.value = '';
      }
    }
  }

  function onShow(filter: Filter) {
    props.store.dispatch({ type: Actions.ResetFilter, filter });
  }

  function inputRefCb(inputElem: HTMLInputElement) {
    input = inputElem;
  }

  return (
    <div >
      <InputRow handleEnter={handleEnter} inputRefCb={inputRefCb} />
      <TodoListU
        items={filterItems(props.store.getState().items, props.store.getState().filter)}
        onClick={handleClick}
      />
      <StatusRow
        numOfActiveItems={numOfActiveItems(props.store.getState().items)}
        onShow={onShow}
        currentFilter={props.store.getState().filter}
      />
    </div >
  );
}