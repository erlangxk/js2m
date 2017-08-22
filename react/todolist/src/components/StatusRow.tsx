import * as React from 'react';

export enum Filter {
    All = 'FILTER_ALL',
    Completed = 'FILTER_COMPLETED',
    Active = 'FILTER_ACTIVE'
}

interface StatusRowProps {
    numOfActiveItems: number;
    currentFilter: Filter;
    onShow: (filter: Filter) => void;
}

export function StatusRow(props: StatusRowProps) {
    return (
        <div>
            <span>{props.numOfActiveItems} left</span>
            &nbsp;
            <FilterButton currFilter={props.currentFilter} destFilter={Filter.All} onClick={props.onShow} />
            &nbsp;
            <FilterButton currFilter={props.currentFilter} destFilter={Filter.Completed} onClick={props.onShow} />
            &nbsp;
            <FilterButton currFilter={props.currentFilter} destFilter={Filter.Active} onClick={props.onShow} />
            &nbsp;
        </div>
    );
}

function FilterButton(props: { currFilter: Filter, destFilter: Filter, onClick: (filter: Filter) => void }) {
    let value: string;
    if (props.destFilter === Filter.All) {
        value = 'Show All';
    } else if (props.destFilter === Filter.Completed) {
        value = 'Only Completed';
    } else {
        value = 'Only Active';
    }
    if (props.currFilter === props.destFilter) {
        return (<span>{value}</span>);
    } else {
        return (<input type="button" value={value} onClick={() => props.onClick(props.destFilter)} />);
    }
}