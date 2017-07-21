import * as React from 'react';

import { TodoItem } from './Todo';

export function TodoInputU(props: { value: string }) {
    return (<input type="text" name="todo" value={props.value} />);
}

export function TodoItemU(props: { value: TodoItem }) {
    const item = props.value;
    if (item.completed) {
        return (<li className=" completed">{item.text}</li>);
    } else {
        return (<li>{item.text}</li>);
    }
}

export function TodoListU(props: { value: TodoItem[] }) {
    return (
        <ul>
            {props.value.map(i => <TodoItemU key={i.id} value={i} />)}
        </ul>
    );
}

export function TodoStatusU(props: any) {
    return (<div>totofooter</div>);
}