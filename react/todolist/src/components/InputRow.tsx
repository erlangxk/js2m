import * as React from 'react';

export function InputRow(props: { handleAddTodo: (value: string) => void }) {
    let input: HTMLInputElement | undefined = undefined;

    function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13 && input) {
            let text = input.value;
            if (text) {
                props.handleAddTodo(text);
                input.value = '';
            }
        }
    }

    function inputRefCb(inputElem: HTMLInputElement) {
        input = inputElem;
    }

    return (
        <input
            type="text"
            placeholder="What needs to be done?"
            onKeyDown={handleEnter}
            ref={inputRefCb}
        />
    );

}
