"use server";

import db from "@/utils/db";
import { getAuthUser } from "@/utils/actions/user";
import { revalidatePath } from "next/cache";
import { renderError } from "@/utils/actions/error";
import { reviewSchema, validateWithZodSchema } from "@/utils/schemas";

export const fetchUserFavorites = async () => {
	const user = await getAuthUser();
	const favorites = await db.favorite.findMany({
		where: {
			clerkId: user.id,
		},
		include: {
			product: true,
		},
	});
	return favorites;
};

export const createReviewAction = async <T>(
	prevState: T,
	formData: FormData,
) => {
	const user = getAuthUser();
	try {
		const rawData = Object.fromEntries(formData);
		const validatedFields = validateWithZodSchema(reviewSchema, rawData);
		await db.review.create({
			data: {
				...validatedFields,
				clerkId: (await user).id,
			},
		});
		revalidatePath(`/products/${validatedFields.productId}`);
		return { message: "review submitted successfully" };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchProductReviews = async ({
	productId,
}: { productId: string }) => {
	const reviews = await db.review.findMany({
		where: {
			productId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return reviews;
};

export const fetchProductReviewsByUser = async () => {
	const user = await getAuthUser();
	const reviews = await db.review.findMany({
		where: {
			clerkId: user.id,
		},
		select: {
			id: true,
			rating: true,
			comment: true,
			product: {
				select: {
					image: true,
					name: true,
				},
			},
		},
	});
	return reviews;
};

export const deleteReviewAction = async ({
	reviewId,
}: { reviewId: string }) => {
	const user = await getAuthUser();
	try {
		await db.review.delete({
			where: {
				id: reviewId,
				clerkId: user.id,
			},
		});
		revalidatePath("/reviews");
		return { message: "review deleted successfully" };
	} catch (error) {
		return renderError(error);
	}
};

export const findExistingReview = async ({
	userId,
	productId,
}: { userId: string; productId: string }) => {
	const review = db.review.findFirst({
		where: {
			productId,
			clerkId: userId,
		},
	});
	return review;
};

export const fetchProductRating = async ({
	productId,
}: { productId: string }) => {
	const res = await db.review.groupBy({
		by: ["productId"],
		_avg: {
			rating: true,
		},
		_count: {
			rating: true,
		},
		where: {
			productId,
		},
	});
	return {
		rating: res[0]?._avg.rating?.toFixed(1) ?? 0,
		count: res[0]?._count.rating ?? 0,
	};
};
