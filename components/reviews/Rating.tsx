import { FaStar, FaRegStar } from "react-icons/fa";

export default function Rating({ rating }: { rating: number }) {
	const stars = Array.from({ length: 5 }, (_, i) => i < rating);
	return (
		<div className="flex items-center gap-x-1">
			{stars.map((isFilled) => {
				const className = `w-3 h-3 ${isFilled ? "text-primary" : "text-gray-400"}`;
				return isFilled ? (
					<FaStar className={className} key={crypto.randomUUID()} />
				) : (
					<FaRegStar className={className} key={crypto.randomUUID()} />
				);
			})}
		</div>
	);
}
