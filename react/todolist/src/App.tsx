import * as React from 'react';
import { TodoListU } from './components/TodoList';
import { newItem, TodoItem } from './components/TodoItem';
import { InputRow } from './components/InputRow';
import { StatusRow, Filter } from './components/StatusRow';
import { Actions } from './reducers/todolist';

export const initState = {
  items: [newItem('idsfsfsfsf', 'text1', true), newItem('id2', 'textssssssssssssss', false)],
  filter: Filter.All
};

export function App(props: { store: any }) {

  let input: HTMLInputElement | undefined = undefined;

  function numOfActiveItems() {
    const state = props.store.getState();
    return state.items.reduce((accu: number, cv: TodoItem) => cv.completed ? accu : accu + 1, 0);
  }

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

  function show() {
    const state = props.store.getState();
    switch (state.filter) {
      case Filter.Active:
        return state.items.filter(function (i: TodoItem) { return !i.completed; });
      case Filter.All:
        return state.items;
      default:
        return state.items.filter(function (i: TodoItem) { return i.completed; });
    }
  }

  function inputRefCb(inputElem: HTMLInputElement) {
    input = inputElem;
  }

  return (
    <div >
      <InputRow handleEnter={handleEnter} inputRefCb={inputRefCb} />
      <TodoListU items={show()} onClick={handleClick} />
      <StatusRow numOfActiveItems={numOfActiveItems} onShow={onShow} />
    </div >
  );
}