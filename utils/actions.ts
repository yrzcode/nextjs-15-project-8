import db from "@/utils/db";
import { redirect } from "next/navigation";

export const fetchFeaturedProducts = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return db.product.findMany({
		where: {
			featured: true,
		},
	});
};

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
	console.log({ search });
	return db.product.findMany({
		where: {
			OR: [
				{
					name: {
						contains: search,
						mode: "insensitive",
					},
				},
				{ company: { contains: search, mode: "insensitive" } },
			],
		},
		orderBy: {
			createAt: "desc",
		},
	});
};

export const fetchSingleProduct = async (productId: string) => {
	const product = await db.product.findUnique({
		where: {
			id: productId,
		},
	});

	if (!product) redirect("/products");
	return product;
};
