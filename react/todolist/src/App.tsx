import * as React from 'react';
import { TodoListU } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { InputRow } from './components/InputRow';
import { StatusRow, Filter } from './components/StatusRow';
import { Actions, filterItems, numOfActiveItems, State } from './reducers/todolist';
import { connect } from 'react-redux';

export const initState = {
  items: [new TodoItem('idsfsfsfsf', 'text1', true), new TodoItem('id2', 'textssssssssssssss', false)],
  filter: Filter.All
};

function todoListMapStateToProps(state: State) {
  return {
    items: filterItems(state.items, state.filter)
  };
}
const todoListMapDispatchToProps = (dispatch: any) => {
  return {
    onClick: (todoItem: TodoItem) => {
      dispatch({ type: Actions.ToggleItem, itemId: todoItem.id });
    }
  };
};

const ToDoListWapper = connect(todoListMapStateToProps, todoListMapDispatchToProps)(TodoListU);

function statusRowMapStateToProps(state: State) {
  return {
    numOfActiveItems: numOfActiveItems(state.items),
    currentFilter: state.filter
  };
}

const statusRowMapDispatchToProps = (dispath: any) => {
  return {
    onShow: (filter: Filter) => dispath({ type: Actions.ResetFilter, filter })
  };
};

const StatusRowWrapper = connect(statusRowMapStateToProps, statusRowMapDispatchToProps)(StatusRow);

export function App(props: { store: any }) {
  let input: HTMLInputElement | undefined = undefined;

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

  function inputRefCb(inputElem: HTMLInputElement) {
    input = inputElem;
  }

  return (
    <div >
      <InputRow handleEnter={handleEnter} inputRefCb={inputRefCb} />
      <ToDoListWapper />
      <StatusRowWrapper />
    </div >
  );
}