import * as React from 'react';

interface StatusRowProps {
    numOfActiveItems: () => number;
    onShowAll: () => void;
    onShowCompleted: () => void;
    onShowActive: () => void;
}

export function StatusRow(props: StatusRowProps) {
    return (
        <div>
            <span>{props.numOfActiveItems()} left</span>
            <input type="button" value="Show All" onClick={props.onShowAll} />
            <input type="button" value="Only Completed" onClick={props.onShowCompleted} />
            <input type="button" value="Only Active" onClick={props.onShowActive} />
        </div>
    );
}