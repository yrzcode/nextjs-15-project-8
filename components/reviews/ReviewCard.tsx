import Image from "next/image";
import Rating from "@/components/reviews/Rating";
import Comment from "@/components/reviews/Comment";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ReviewCard({
	reviewInfo,
	children,
}: {
	reviewInfo: {
		comment: string;
		rating: number;
		image: string;
		name: string;
	};
	children?: React.ReactNode;
}) {
	const { comment, rating, image, name } = reviewInfo;

	return (
		<Card className="relative">
			<CardHeader>
				<div className="flex items-center">
					<Image
						src={image}
						alt={name}
						width={48}
						height={48}
						className="w-12 h-12 rounded-full object-cover"
					/>
					<div className="ml-4">
						<h3 className="text-sm font-bold capitalize mb-1">{name}</h3>
						<Rating rating={rating} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Comment comment={comment} />
			</CardContent>
			<div className="absolute top-3 right-3">{children}</div>
		</Card>
	);
}
