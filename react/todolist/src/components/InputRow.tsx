import * as React from 'react';

interface InputRowProps {
    handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    inputRefCb: (input: HTMLInputElement) => void;
}

export class InputRow extends React.Component<InputRowProps, never> {
    constructor(props: InputRowProps) {
        super(props);
    }
    render() {
        return (
            <input
                type="text"
                placeholder="What needs to be done?"
                onKeyDown={this.props.handleEnter}
                ref={this.props.inputRefCb}
            />
        );
    }
}
