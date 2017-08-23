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

const buttons = [[Filter.All, 'Show All'], [Filter.Completed, 'Only Complete'], [Filter.Active, 'Only Active']];

export function StatusRow(props: StatusRowProps) {

    return (
        <div>
            <span>{props.numOfActiveItems} left</span>
            &nbsp;
            {
                buttons.map(function (e: [Filter, string]) {
                    let [filter, value] = e;
                    return (
                        <FilterButton
                            key={filter}
                            active={props.currentFilter === filter}
                            value={value}
                            onClick={() => props.onShow(filter)}
                        />
                    );
                })
            }
        </div>
    );
}

function FilterButton(props: { active: boolean, value: string, onClick: () => void }) {
    if (props.active) {
        return (<span>{props.value}</span>);
    } else {
        return (<input type="button" value={props.value} onClick={props.onClick} />);
    }
}