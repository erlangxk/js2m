import * as React from 'react';

export enum Filter {
    All, Completed, Active
}

interface StatusRowProps {
    numOfActiveItems: () => number;
    onShow: (filter: Filter) => void;
}

export function StatusRow(props: StatusRowProps) {
    return (
        <div>
            <span>{props.numOfActiveItems()} left</span>
            <input type="button" value="Show All" onClick={() => props.onShow(Filter.All)} />
            <input type="button" value="Only Completed" onClick={() => props.onShow(Filter.Completed)} />
            <input type="button" value="Only Active" onClick={() => props.onShow(Filter.Active)} />
        </div>
    );
}