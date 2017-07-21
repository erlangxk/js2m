import * as React from 'react';

export interface TodoItem {
    completed: boolean;
    text: string;
    id: string;
    complete: () => TodoItem;
}

class TodoItemImpl implements TodoItem {
    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly completed: boolean = false) { }

    complete = () => {
        return new TodoItemImpl(this.id, this.text, true);
    }
}

export function item(id: string, text: string, completed: boolean): TodoItem {
    return new TodoItemImpl(id, text, completed);
}

export function TodoItemU({ value }: { value: TodoItem }) {
    const clsName = value.completed ? 'completed' : 'active';
    return (<li className={clsName}> {value.text} </li>);
}
