import * as React from 'react';

export interface TodoItem {
    completed: boolean;
    text: string;
    id: string;
    toggleComplete: () => TodoItem;
}

class TodoItemImpl implements TodoItem {
    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly completed: boolean = false) { }

    toggleComplete = () => {
        return new TodoItemImpl(this.id, this.text, !this.completed);
    }
}

export function item(id: string, text: string, completed: boolean): TodoItem {
    return new TodoItemImpl(id, text, completed);
}

export function TodoItemU(props: { item: TodoItem, onClick: (todoItem: TodoItem) => void }) {
    const clsName = props.item.completed ? 'completed' : 'active';
    return (
        <li className={clsName}>
            <input type="checkbox" checked={props.item.completed} onClick={() => props.onClick(props.item)} />
            <span> {props.item.text} </span>
        </li>
    );
}
