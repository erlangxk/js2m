import * as React from 'react';

export enum Filter {
    All = 'FILTER_ALL',
    Completed = 'FILTER_COMPLETED',
    Active = 'FILTER_ACTIVE'
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