import { useMemo, useState } from "react";
import "./Game.css";
import Board from "../Board/Board";
import Order from "../Order/Order";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const [ascendingOrder, setAscendingOrder] = useState(true);
	const xIsNext = currentMove % 2 === 0;
	const [coordinates, setCoordinates] = useState([] as string[]);

	// Make the "Go to game start button to empty the history and set the current move to 0"
	const orderedMoves = useMemo(() => {
		const moves = history.map((_squares, move) => {
			let description;
			if (move === history.length - 1 && move !== 0) {
				description = `You are at move #${move} : ${coordinates[history.length - 2]}`;
			} else if (move > 0) {
				description = `Go to move #${move} : ${coordinates[move - 1]}`;
			} else {
				description = "Go to game start";
			}
			return (
				<li key={move}>
					<button onClick={() => jumpTo(move)}>{description}</button>
				</li>
			);
		});

		return ascendingOrder ? moves : moves.reverse();
	}, [history, ascendingOrder, coordinates]);

	function calculateCoordinates(index: number): string {
		const row = Math.floor(index / 3 + 1);
		const col = (index % 3) + 1;
		return `(${row}, ${col})`;
	}

	function handlePlay(nextSquares: string[], index: number) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);

		console.log("nextSquares", nextSquares);
		const nextCoordinates = [...coordinates.slice(0, currentMove), calculateCoordinates(index)];
		setCoordinates(nextCoordinates);

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
				{ascendingOrder ? <ol>{orderedMoves}</ol> : <ol reversed>{orderedMoves}</ol>}
			</div>
		</div>
	);
}
