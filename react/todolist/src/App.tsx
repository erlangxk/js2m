import * as React from 'react';
import { TodoListU } from './components/TodoList';
import { item, TodoItem } from './components/TodoItem';

const uuidv1 = require('uuid/v1');

class App extends React.Component<{}, { items: TodoItem[] }> {
  constructor() {
    super();
    this.state = {
      items: [item('idsfsfsfsf', 'text1', true), item('id2', 'textssssssssssssss', false)]
    };
    this.handleClick = this.handleClick.bind(this);
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
    items.push(item(uuidv1(), value, false));
    this.setState({ items: items });
  }

  handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      let input = document!.getElementById('newTodo') as HTMLInputElement;
      let text = input.value;
      if (text != null) {
        this.handleAddTodo(text);
        input.value = '';
      }
    }
  }

  render() {
    return (
      <div >
        <input
          id="newTodo"
          type="text"
          name="newTodo"
          placeholder="What needs to be done?"
          onKeyDown={this.handleEnter}
        />
        <TodoListU items={this.state.items} onClick={this.handleClick} />

        <span>{this.numOfActiveItems()} left</span>
      </div >
    );
  }
}

export default App;