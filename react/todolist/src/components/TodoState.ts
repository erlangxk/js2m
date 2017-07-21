import { TodoItem } from './Todo';

export function item(id: string, text: string): TodoItem {
    return new TodoItemImpl(id, text);
}

export class TodoItemImpl implements TodoItem {
    completed: boolean;
    text: string;
    id: string;

    constructor(id: string, text: string, completed: boolean = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    complete = () => {
        if (this.completed) {
            return this;
        } else {
            return new TodoItemImpl(this.id, this.text, true);
        }
    }
}

enum Filter {
    ALL = 0,
    ACTIVE = 1,
    COMPLETED = 2
}

class TodoState {

    constructor(
        public readonly input: string | undefined = undefined,
        public readonly items: TodoItem[] = [],
        public readonly filter: Filter = Filter.ALL,
        public readonly finished: number = 0) { }

    hasFinishedItem = () => this.finished === 0;

    listItems = () => {
        switch (this.filter) {
            case Filter.COMPLETED: return this.items.filter(i => i.completed);
            case Filter.ACTIVE: return this.items.filter(i => !i.completed);
            default: return this.items;
        }
    }

    clearCompleted = () => {
        const items = this.items.filter(i => !i.completed);
        return new TodoState(this.input, items, this.filter, 0);
    }

    updateInput = (input: string) => {
        return new TodoState(input, this.items, this.filter, this.finished);
    }

    complete = (id: string) => {
        let items: TodoItem[] = [];
        let changed = false;
        this.items.forEach(function (i: TodoItem) {
            if (i.id !== id) {
                items.push(i);
            } else if (i.completed) {
                items.push(i);
            } else {
                changed = true;
                items.push(i.complete());
            }
        });
        const finished = changed ? this.finished + 1 : this.finished;
        return new TodoState(this.input, items, this.filter, finished);
    }

    addItem = (id: string, text: string) => {
        const items = this.items.slice();
        items.push(item(id, text));
        return new TodoState(undefined, items, this.filter, this.finished);
    }

    applyFilter = (filter: Filter) => {
        if (this.filter === filter) {
            return this;
        } else {
            return new TodoState(this.input, this.items, this.finished);
        }
    }
}