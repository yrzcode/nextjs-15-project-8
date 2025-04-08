import Image from "next/image";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductRating from "@/components/single-product/ProductRating";
import AddToCart from "@/components/single-product/AddToCart";
import ShareButton from "@/components/single-product/ShareButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { fetchSingleProduct, findExistingReview } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import { auth } from "@clerk/nextjs/server";

export default async function SingleProductPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const product = await fetchSingleProduct(id);
	const { name, image, company, description, price } = product;
	const dollarsAmount = formatCurrency(price);
	const { userId } = await auth();
	const reviewDoesNotExist =
		userId && !(await findExistingReview({ userId, productId: id }));
	return (
		<section>
			<BreadCrumbs name={name} />
			<div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
				{/* Image Col */}
				<div className="relative h-full">
					<Image
						src={image}
						alt={name}
						fill
						priority
						sizes="(max-width:768px) 100vh,(max-width:1200px) 50vw, 33vw"
						className="w-full rounded object-cover"
					/>
				</div>

				{/* Product Info Col*/}
				<div>
					<div className="flex gap-x-8 items-center">
						<h1 className="capitalize text-3xl font-bold">{name}</h1>
						<div className="flex items-center gap-x-2">
							<FavoriteToggleButton productId={id} />
							<ShareButton productId={id} name={name} />
						</div>
					</div>
					<ProductRating productId={id} />
					<h4 className="text-xl mt-2">{company}</h4>
					<p className="mt-3 text-md bg-muted inline-block p-2 rounded">
						{dollarsAmount}
					</p>
					<p className="mt-6 leading-8 text-muted-foreground">{description}</p>
					<AddToCart productId={id} />
				</div>
			</div>
			<ProductReviews productId={id} />
			{reviewDoesNotExist && <SubmitReview productId={id} />}
		</section>
	);
}
