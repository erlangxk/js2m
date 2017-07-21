import * as React from 'react';

import { TodoListU } from './components/TodoList';

import { item } from './components/TodoItem';
const items = [item('idsfsfsfsf', 'text1', true), item('id2', 'textssssssssssssss', false)];

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <TodoListU items={items} />
      </div>
    );
  }
}
export default App;
