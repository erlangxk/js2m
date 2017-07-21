import * as React from 'react';

import { TodoStatusU, TodoInputU, TodoListU } from './components/TodoUI';
import { item } from './components/TodoState';

const items = [item('idsfsfsfsf', 'text1'), item('id2', 'textssssssssssssss')];

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <TodoInputU value="input" />
        <TodoListU value={items}/>
        <TodoStatusU />
      </div>
    );
  }
}
export default App;
