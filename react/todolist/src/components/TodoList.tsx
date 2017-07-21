import * as React from 'react';
import { TodoItem, TodoItemU } from './TodoItem';

interface TodoList {
    items: TodoItem[];
}

export function TodoListU(props: TodoList) {
    return (
        <ul>
            {props.items.map(i => <TodoItemU key={i.id} value={i} />)}
        </ul>
    );
}