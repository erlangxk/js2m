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
        return <Square value={props.value.squares[i]} onClick={() => props.onClick(i, props.value)} />;
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );

}

interface History {
    items: GameStateImpl[];
}

export class Game extends React.Component<{}, History> {
    newest: GameStateImpl;
    constructor() {
        super();
        this.state = {
            items: [new GameStateImpl()]
        };
        this.onClick = this.onClick.bind(this);
        this.last = this.last.bind(this);
        this.newest = this.state.items[this.state.items.length - 1];
    }

    last(): GameStateImpl {
        return this.state.items[this.state.items.length - 1];
    }

    onClick(i: number, gameState: GameStateImpl): void {
        const [changed, newState] = gameState.place(i);
        if (changed) {
            this.setState({ items: [...this.state.items, newState] });
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board value={this.last()} onClick={this.onClick} />
                </div>
                <div className="game-info">
                    <div>{this.last().status()}</div>
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        );
    }
}
