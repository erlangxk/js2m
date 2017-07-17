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
}

function Square(props: { value: SquareItem, onClick: () => void }) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component<{}, GameStateImpl> {
    constructor() {
        super();
        this.state = new GameStateImpl();
    }

    renderSquare(i: number) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    handleClick(i: number) {
        const [changed, newState] = this.state.place(i);
        if (changed) {
            this.setState(newState);
        }
    }

    render() {
        const winner = this.state.calculateWinner();
        const status = !!winner ? `Winner: ${winner}` : `Next player: ${this.state.next()}`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export class Game extends React.Component<{}, never> {

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/*status*/}</div>
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        );
    }
}
