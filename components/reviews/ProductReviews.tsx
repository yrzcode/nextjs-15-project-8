import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchProductReviews } from "@/utils/actions";

export default async function ProductReviews({
	productId,
}: { productId: string }) {
	const reviews = await fetchProductReviews({ productId });
	return (
		<div className="mt-16">
			<SectionTitle text="product reviews" />
			<div className="grid md:grid-cols-2 gap-8 my-8">
				{reviews.map((review) => {
					const { id, comment, rating, authorImageUrl, authorName } = review;
					const reviewInfo = {
						comment,
						rating,
						image: authorImageUrl,
						name: authorName,
					};
					return <ReviewCard key={id} reviewInfo={reviewInfo} />;
				})}
			</div>
		</div>
	);
}
