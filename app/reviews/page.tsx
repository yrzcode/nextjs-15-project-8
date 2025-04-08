import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";

export default async function ReviewsPage() {
	const reviews = await fetchProductReviewsByUser();
	if (!reviews.length) return <SectionTitle text="you have no reviews yet" />;

	return (
		<>
			<SectionTitle text="Your Reviews" />
			<section className="grid md:grid-cols-2 gap-8 mt-4">
				{reviews.map((review) => {
					const { id, comment, rating, product } = review;
					const { name, image } = product;
					const reviewInfo = {
						comment,
						rating,
						name,
						image,
					};

					return (
						<ReviewCard key={id} reviewInfo={reviewInfo}>
							<DeleteReview reviewId={id} />
						</ReviewCard>
					);
				})}
			</section>
		</>
	);
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
	const deleteReview = deleteReviewAction.bind(null, { reviewId });
	return (
		<FormContainer action={deleteReview}>
			<IconButton actionType="delete" />
		</FormContainer>
	);
};
