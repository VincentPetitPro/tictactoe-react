interface OrderProps {
	order: boolean;
	onOrderClick: () => void;
}

export default function Order({ order, onOrderClick }: OrderProps) {
	const orderText = order ? "ascending" : "descending";
	return <button onClick={onOrderClick}>order: {orderText}</button>;
}
