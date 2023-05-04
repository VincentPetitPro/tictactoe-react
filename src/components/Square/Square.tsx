interface SquareProps {
	marker: string;
	onSquareClick: (index: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Square({ marker, onSquareClick }: SquareProps) {
	return (
		<button className="square" onClick={onSquareClick}>
			{marker}
		</button>
	);
}
