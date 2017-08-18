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

export class App extends React.Component<{ store: any }, never> {

  input: HTMLInputElement | undefined = undefined;

  constructor(props: { store: any }) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.inputRefCb = this.inputRefCb.bind(this);
  }

  numOfActiveItems = () => {
    const state = this.props.store.getState();
    return state.items.reduce((accu: number, cv: TodoItem) => cv.completed ? accu : accu + 1, 0);
  }

  handleClick(todoItem: TodoItem) {
    this.props.store.dispatch({ type: Actions.ToggleItem, itemId: todoItem.id });
  }

  handleAddTodo = (value: string) => {
    this.props.store.dispatch({ type: Actions.AddItem, text: value });
  }

  handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && this.input) {
      let text = this.input.value;
      if (text) {
        this.handleAddTodo(text);
        this.input.value = '';
      }
    }
  }

  onShow = (filter: Filter) => {
    this.props.store.dispatch({ type: Actions.ResetFilter, filter });
  }

  show = () => {
    const state = this.props.store.getState();
    switch (state.filter) {
      case Filter.Active:
        return state.items.filter(function (i: TodoItem) { return !i.completed; });
      case Filter.All:
        return state.items;
      default:
        return state.items.filter(function (i: TodoItem) { return i.completed; });
    }
  }

  inputRefCb(input: HTMLInputElement) {
    this.input = input;
  }

  render() {
    return (
      <div >
        <InputRow handleEnter={this.handleEnter} inputRefCb={this.inputRefCb} />
        <TodoListU items={this.show()} onClick={this.handleClick} />
        <StatusRow numOfActiveItems={this.numOfActiveItems} onShow={this.onShow} />
      </div >
    );
  }
}