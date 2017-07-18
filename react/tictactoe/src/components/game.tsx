import * as React from 'react';
import './game.css';

type SquareItem = string | null;
interface GameState {
    squares: SquareItem[];
    xIsNext: boolean;
}

class GameStateImpl implements GameState {
    private static lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    constructor(public squares: SquareItem[] = Array(9).fill(null), public xIsNext: boolean = true) {
        this.place = this.place.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
    }

    calculateWinner(): SquareItem {
        for (const l of GameStateImpl.lines) {
            const [a, b, c] = l;
            if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[b] === this.squares[c]) {
                return this.squares[a];
            }
        }
        return null;
    }

    next = () => {
        return this.xIsNext ? 'X' : 'O';
    }

    place(i: number): [boolean, GameStateImpl] {
        if (this.squares[i] || this.calculateWinner()) {
            return [false, this];
        } else {
            const squares = this.squares.slice();
            squares[i] = this.next();
            return [true, new GameStateImpl(squares, !this.xIsNext)];
        }
    }

    status(): string {
        const winner = this.calculateWinner();
        return !!winner ? `Winner: ${winner}` : `Next player: ${this.next()}`;
    }
}

function Square(props: { value: SquareItem, onClick: () => void }) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props: { value: GameStateImpl, onClick: (i: number, gameState: GameStateImpl) => void }) {
    function renderSquare(i: number) {
        return <Square key={i} value={props.value.squares[i]} onClick={() => props.onClick(i, props.value)} />;
    }

    function renderRow(arr: number[], idx: number) {
        return (<div className="board-row" key={idx}>{arr.map(v => renderSquare(v))}</div>);
    }

    return (
        <div>
            {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((arr, idx) => renderRow(arr, idx))}
        </div>
    );
}

interface History {
    items: GameStateImpl[];
    index: number;
}

export class Game extends React.Component<{}, History> {
    constructor() {
        super();
        this.state = {
            items: [new GameStateImpl()],
            index: 0,
        };
        this.onClick = this.onClick.bind(this);
        this.current = this.current.bind(this);
        this.moves = this.moves.bind(this);
    }

    current(): GameStateImpl {
        return this.state.items[this.state.index];
    }

    onClick(i: number, gameState: GameStateImpl): void {
        const [changed, newState] = gameState.place(i);
        if (changed) {
            const root = this.state.items.slice(0, this.state.index + 1);
            this.setState({ items: [...root, newState], index: root.length });
        }
    }

    jump(idx: number): void {
        this.setState({ items: this.state.items, index: idx });
    }

    moves() {
        return this.state.items.map((s, idx) => {
            if (idx === this.state.index) {
                return (
                    <li key={idx} className="current">
                        <a href="#" onClick={() => this.jump(idx)}>jump back to {idx}</a>
                    </li>
                );
            } else {
                return (<li key={idx}><a href="#" onClick={() => this.jump(idx)}>jump back to {idx}</a></li>);
            }
        }
        );
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board value={this.current()} onClick={this.onClick} />
                </div>
                <div className="game-info">
                    <div>{this.current().status()}</div>
                    <ol>{this.moves()}</ol>
                </div>
            </div>
        );
    }
}
