import "./Square.css";

interface SquareProps {
	marker: string;
	isWinningSquare: boolean;
	onSquareClick: (index: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Square({ marker, isWinningSquare, onSquareClick }: SquareProps) {
	if (isWinningSquare) {
		return (
			<button className="square winning-square" onClick={onSquareClick}>
				{marker}
			</button>
		);
	}
	return (
		<button className="square" onClick={onSquareClick}>
			{marker}
		</button>
	);
}
