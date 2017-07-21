export interface TodoItem {
    completed: boolean;
    text: string;
    id: string;

    complete: () => TodoItem;
}