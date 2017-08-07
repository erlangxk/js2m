import * as React from 'react';
import { TodoItem, TodoItemU } from './TodoItem';

interface TodoList {
    items: TodoItem[];
    onClick: (item: TodoItem) => void;
}

export function TodoListU(props: TodoList) {
    return (
        <ul>
            {props.items.map(i => <TodoItemU key={i.id} item={i} onClick={props.onClick}  />)}
        </ul>
    );
}