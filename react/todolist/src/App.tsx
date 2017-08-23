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

const statusRowMapDispatchToProps = (dispatch: any) => {
  return {
    onShow: (filter: Filter) => dispatch({ type: Actions.ResetFilter, filter })
  };
};

const StatusRowWrapper = connect(statusRowMapStateToProps, statusRowMapDispatchToProps)(StatusRow);

const inputRowMapDispatchToProps = (dispatch: any) => {
  return {
    handleAddTodo: (text: string) => dispatch({ type: Actions.AddItem, text })
  };
};
const InputRowWapper = connect(null, inputRowMapDispatchToProps)(InputRow);

export function App() {
  return (
    <div >
      <InputRowWapper />
      <ToDoListWapper />
      <StatusRowWrapper />
    </div >
  );
}