"use server";

import db from "@/utils/db";
import type { ActionFunction } from "@/utils/types";
import { redirect } from "next/navigation";
import { getAdminUser, getAuthUser } from "@/utils/actions/user";
import {
	imageSchema,
	productSchema,
	validateWithZodSchema,
} from "@/utils/schemas";
import { deleteImage, uploadImage } from "@/utils/supabase";
import { renderError } from "@/utils/actions/error";
import { revalidatePath } from "next/cache";

export const fetchFeaturedProducts = async () => {
	return db.product.findMany({
		where: {
			featured: true,
		},
	});
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
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
			createdAt: "desc",
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

export const createProductAction: ActionFunction<{ message: string }> = async (
	prevState: { message: string },
	formData: FormData,
) => {
	const user = await getAuthUser();

	try {
		const rawData = Object.fromEntries(formData);
		const image = formData.get("image") as File;
		const validateFields = validateWithZodSchema(productSchema, rawData);
		const validateFile = validateWithZodSchema(imageSchema, { image });
		const fullPath = await uploadImage(validateFile.image);

		await db.product.create({
			data: {
				...validateFields,
				image: fullPath,
				clerkId: user.id,
			},
		});
		// return { message: "product created" };
	} catch (error) {
		return renderError(error);
	}
	redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
	await getAdminUser();
	const products = await db.product.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return products;
};

export const deleteProductAction = async ({
	productId,
}: {
	productId: string;
}) => {
	await getAdminUser();
	try {
		const product = await db.product.delete({
			where: {
				id: productId,
			},
		});
		await deleteImage(product.image);
		revalidatePath("/admin/products");
		return { message: "product remove" };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchAdminProductDetail = async (productId: string) => {
	await getAdminUser();
	const product = await db.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!productId) redirect("/admin/products");
	return product;
};

export const updateProductAction = async <T>(
	prevState: T,
	formData: FormData,
) => {
	await getAdminUser();
	try {
		const productId = formData.get("id") as string;
		const rawData = Object.fromEntries(formData);
		const validateFields = validateWithZodSchema(productSchema, rawData);
		await db.product.update({
			where: { id: productId },
			data: {
				...validateFields,
			},
		});
		revalidatePath(`/admin/products/${productId}/edit`);
		return { message: "Product updated successfully" };
	} catch (error) {
		return renderError(error);
	}
};

export const updateProductImageAction = async <T>(
	prevState: T,
	formData: FormData,
) => {
	await getAdminUser();
	try {
		const image = formData.get("image") as File;
		const productId = formData.get("id") as string;
		const oldImageUrl = formData.get("url") as string;

		const validatedFile = validateWithZodSchema(imageSchema, { image });
		const fullPath = await uploadImage(validatedFile.image);
		await deleteImage(oldImageUrl);
		await db.product.update({
			where: {
				id: productId,
			},
			data: {
				image: fullPath,
			},
		});
		revalidatePath(`/admin/products/${productId}/edit`);
		return { message: "Product updated successfully" };
	} catch (error) {
		return renderError(error);
	}
};
