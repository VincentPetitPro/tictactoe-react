import { useState } from "react";
import Board from "../Board/Board";
import Order from "../Order/Order";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const [ascendingOrder, setAscendingOrder] = useState(true);
	const xIsNext = currentMove % 2 === 0;
	const moves = history.map((_squares, move) => {
		let description;
		if (move === history.length - 1) {
			description = "You are at move #" + move;
		} else if (move > 0) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	function handlePlay(nextSquares: string[]) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove: number) {
		setCurrentMove(nextMove);
	}

	function changeOrder() {
		setAscendingOrder(!ascendingOrder);
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<Order order={ascendingOrder} onOrderClick={changeOrder} />
				{ascendingOrder ? <ol>{moves}</ol> : <ol reversed>{moves.reverse()}</ol>}
			</div>
		</div>
	);
}
