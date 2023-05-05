import { useState } from "react";
import Square from "../Square/Square";
interface BoardProps {
	xIsNext: boolean;
	squares: string[];
	onPlay: (nextSquares: string[], index: number) => void;
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
	const winningSquares = [] as number[];

	// useMemo
	function calculateWinner(squares: string[]): string | null {
		const LINES = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < LINES.length; i++) {
			const [a, b, c] = LINES[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				winningSquares.push(...[a, b, c]);
				return squares[a];
			}
		}
		return null;
	}

	const handleClick = (index: number) => {
		if (squares[index] || calculateWinner(squares)) return;
		const nextSquares = [...squares];
		if (xIsNext) {
			nextSquares[index] = "X";
		} else {
			nextSquares[index] = "O";
		}
		onPlay(nextSquares, index);
	};

	// Use memo
	const getStatus = (winner: string | null, currentMove: number) => {
		if (winner) {
			return `Winner: ${winner}`;
		} else if (currentMove === 9) {
			return "Draw";
		} else {
			return `Next player: ${xIsNext ? "X" : "O"}`;
		}
	};

	const winner = calculateWinner(squares);
	const status = getStatus(winner, squares.filter(Boolean).length);
	const squaresJSX = [0, 1, 2].map((row) => (
		<div className="board-row" key={row}>
			{[0, 1, 2].map((col) => (
				<Square
					key={row * 3 + col}
					marker={squares[row * 3 + col]}
					isWinningSquare={winner !== null && winningSquares.includes(row * 3 + col)}
					onSquareClick={() => handleClick(row * 3 + col)}
				/>
			))}
		</div>
	));

	return (
		<>
			<div className="status">{status}</div>
			{squaresJSX}
		</>
	);
}
