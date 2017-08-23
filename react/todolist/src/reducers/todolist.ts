import { TodoItem } from '../components/TodoItem';
import { Filter } from '../components/StatusRow';

import v1 = require('uuid/v1');

export enum Actions {
    AddItem = 'ADD_ITEM',
    ToggleItem = 'TOGGLE_ITEM',
    ResetFilter = 'Reset_Filter',
}

interface AddItemAction {
    type: Actions.AddItem;
    text: string;
}

interface ToggleItemAction {
    type: Actions.ToggleItem;
    itemId: string;
}

interface FilterAction {
    type: Actions.ResetFilter;
    filter: Filter;
}
type Action = AddItemAction | ToggleItemAction | FilterAction;

function toggleComplete(items: TodoItem[], itemId: string): TodoItem[] {
    return items.map((value: TodoItem) => value.id !== itemId ? value : value.toggleComplete());
}

export function todoListReducer(state: TodoItem[], action: Action): TodoItem[] {
    switch (action.type) {
        case Actions.AddItem:
            return [...state, new TodoItem(v1(), action.text, false)];
        case Actions.ToggleItem:
            return toggleComplete(state, action.itemId);
        default:
            return state;
    }
}

export function filterReducer(state: Filter, action: Action): Filter {
    if (action.type === Actions.ResetFilter) {
        return action.filter;
    } else {
        return state;
    }
}

export interface State {
    filter: Filter;
    items: TodoItem[];
}
export function reducer(state: State, action: Action) {
    return {
        items: todoListReducer(state.items, action),
        filter: filterReducer(state.filter, action),
    };
}

export function filterItems(items: TodoItem[], filter: Filter) {
    switch (filter) {
        case Filter.Active:
            return items.filter(function (i: TodoItem) { return !i.completed; });
        case Filter.All:
            return items;
        default:
            return items.filter(function (i: TodoItem) { return i.completed; });
    }
}

export function numOfActiveItems(items: TodoItem[]) {
    return items.reduce((accu: number, cv: TodoItem) => cv.completed ? accu : accu + 1, 0);
}
