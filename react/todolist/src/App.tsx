import * as React from 'react';

import { TodoListU } from './components/TodoList';

import { item, TodoItem } from './components/TodoItem';

class App extends React.Component<{}, { items: TodoItem[] }> {
  constructor() {
    super();
    this.state = {
      items: [item('idsfsfsfsf', 'text1', true), item('id2', 'textssssssssssssss', false)]
    };
    this.handleClick = this.handleClick.bind(this);
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

  render() {
    return (
      <div >
        <TodoListU items={this.state.items} onClick={this.handleClick} />
      </div >
    );
  }
}

export default App;