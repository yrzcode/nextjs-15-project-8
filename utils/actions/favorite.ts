"use server";

import db from "@/utils/db";
import { getAuthUser } from "@/utils/actions/user";
import { revalidatePath } from "next/cache";
import { renderError } from "@/utils/actions/error";

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
	const user = await getAuthUser();
	const favorite = await db.favorite.findFirst({
		where: {
			productId,
			clerkId: user.id,
		},
		select: {
			id: true,
		},
	});
	return favorite?.id || null;
};

export const toggleFavoriteAction = async ({
	productId,
	favoriteId,
	pathname,
}: {
	productId: string;
	favoriteId: string | null;
	pathname: string;
}) => {
	const user = await getAuthUser();
	try {
		if (favoriteId) {
			await db.favorite.delete({
				where: {
					id: favoriteId,
				},
			});
		} else {
			await db.favorite.create({
				data: {
					productId,
					clerkId: user.id,
				},
			});
		}
		revalidatePath(pathname);
		return {
			message: favoriteId ? "removed from favorites" : "add to favorites",
		};
	} catch (error) {
		return renderError(error);
	}
};
