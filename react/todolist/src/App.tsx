import * as React from 'react';
import { TodoListU } from './components/TodoList';
import { newItem, TodoItem } from './components/TodoItem';
import { InputRow } from './components/InputRow';
import v1 = require('uuid/v1');

enum Filter {
  All, Completed, Active
}

class App extends React.Component<{}, { items: TodoItem[], filter: Filter }> {

  input: HTMLInputElement | undefined = undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      items: [newItem('idsfsfsfsf', 'text1', true), newItem('id2', 'textssssssssssssss', false)],
      filter: Filter.All
    };
    this.handleClick = this.handleClick.bind(this);
    this.inputRefCb = this.inputRefCb.bind(this);
  }

  numOfActiveItems = () => {
    function cb(accu: number, cv: TodoItem) {
      if (cv.completed) {
        return accu;
      } else {
        return accu + 1;
      }
    }
    return this.state.items.reduce(cb, 0);
  }

  handleClick(todoItem: TodoItem) {
    let newitems: TodoItem[] = [];
    function cb(xitem: TodoItem, index: number) {
      if (xitem.id !== todoItem.id) {
        newitems.push(xitem);
      } else {
        newitems.push(todoItem.toggleComplete());
      }
    }
    this.state.items.forEach(cb);
    this.setState({ items: newitems });
  }

  handleAddTodo = (value: string) => {
    let items = this.state.items.slice();
    items.push(newItem(v1(), value, false));
    this.setState({ items: items });
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

  showAll = () => {
    if (this.state.filter !== Filter.All) {
      const newState = { ...this.state, filter: Filter.All };
      this.setState(newState);
    }
  }

  showActive = () => {
    if (this.state.filter !== Filter.Active) {
      const newState = { ...this.state, filter: Filter.Active };
      this.setState(newState);
    }
  }

  showCompleted = () => {
    if (this.state.filter !== Filter.Completed) {
      const newState = { ...this.state, filter: Filter.Completed };
      this.setState(newState);
    }
  }

  show = () => {
    switch (this.state.filter) {
      case Filter.Active:
        return this.state.items.filter(function (i: TodoItem) { return !i.completed; });
      case Filter.All:
        return this.state.items;
      default:
        return this.state.items.filter(function (i: TodoItem) { return i.completed; });
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
        <span>{this.numOfActiveItems()} left</span>
        <input type="button" value="Show All" onClick={this.showAll} />
        <input type="button" value="Only Completed" onClick={this.showCompleted} />
        <input type="button" value="Only Active" onClick={this.showActive} />
      </div >
    );
  }
}
export default App;