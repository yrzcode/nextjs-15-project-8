"use server";

import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { renderError } from "@/utils/actions/error";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/utils/actions/user";
import { revalidatePath } from "next/cache";
import type { Cart } from "@prisma/client";

export const fetchCartItems = async () => {
	const { userId } = await auth();
	const cart = await db.cart.findFirst({
		where: {
			clerkId: userId ?? "",
		},
		select: {
			numItemsInCart: true,
		},
	});
	return cart?.numItemsInCart || 0;
};

export const fetchProduct = async ({ productId }: { productId: string }) => {
	console.log("fetchProduct");
	const product = db.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!product) {
		throw new Error("Product not found");
	}
	return product;
};

const includeProductClause = {
	cartItems: {
		include: {
			product: true,
		},
	},
};

export const fetchOrCreateCart = async ({
	userId,
	errorOnFailure = false,
}: {
	userId: string;
	errorOnFailure?: boolean;
}) => {
	let cart = await db.cart.findFirst({
		where: {
			clerkId: userId,
		},
		include: includeProductClause,
	});

	if (!cart && errorOnFailure) {
		throw new Error("Cart not found");
	}

	if (!cart) {
		cart = await db.cart.create({
			data: { clerkId: userId },
			include: includeProductClause,
		});
	}

	return cart;
};

export const updateOrCreateCartItem = async ({
	productId,
	cartId,
	amount,
}: {
	productId: string;
	cartId: string;
	amount: number;
}) => {
	let cartItem = await db.cartItem.findFirst({
		where: {
			productId,
			cartId,
		},
	});

	if (cartItem) {
		cartItem = await db.cartItem.update({
			where: { id: cartItem.id },
			data: { amount: cartItem.amount + amount },
		});
	} else {
		cartItem = await db.cartItem.create({
			data: {
				amount,
				productId,
				cartId,
			},
		});
	}
};

export const updateCart = async ({ cart }: { cart: Cart }) => {
	const cartItems = await db.cartItem.findMany({
		where: { cartId: cart.id },
		include: {
			product: true,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
	let numItemsInCart = 0;
	let cartTotal = 0;

	for (const item of cartItems) {
		numItemsInCart += item.amount;
		cartTotal += item.amount * item.product.price;
	}

	const tax = cart.taxRate * cartTotal;
	const shipping = cartTotal ? cart.shipping : 0;
	const orderTotal = cartTotal + tax + shipping;
	const currentCart = await db.cart.update({
		where: {
			id: cart.id,
		},
		data: {
			numItemsInCart,
			cartTotal,
			tax,
			orderTotal,
		},
		include: includeProductClause,
	});

	return { cartItems, currentCart };
};

export const addToCartAction = async <T>(prevState: T, formData: FormData) => {
	const user = await getAuthUser();
	try {
		const productId = formData.get("productId") as string;
		const amount = Number(formData.get("amount"));

		await fetchProduct({ productId });

		const cart = await fetchOrCreateCart({
			userId: user.id,
		});

		if (cart) {
			await updateOrCreateCartItem({
				productId,
				cartId: cart.id ?? "",
				amount,
			});
			await updateCart({ cart });
		}
	} catch (error) {
		return renderError(error);
	}
	redirect("/cart");
};

export const removeCartItemAction = async <T>(
	prevState: T,
	formData: FormData,
) => {
	const user = await getAuthUser();

	try {
		const cartItemId = formData.get("id") as string;

		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});

		await db.cartItem.delete({
			where: {
				id: cartItemId,
				cartId: cart.id,
			},
		});
		await updateCart({ cart });
		revalidatePath("/cart");
		return { message: "Item removed from cart" };
	} catch (error) {
		return renderError(error);
	}
};

export const updateCartItemAction = async ({
	amount,
	cartItemId,
}: {
	amount: number;
	cartItemId: string;
}) => {
	const user = await getAuthUser();
	try {
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});
		await db.cartItem.update({
			where: {
				id: cartItemId,
				cartId: cart.id,
			},
			data: {
				amount,
			},
		});
		await updateCart({ cart });
		revalidatePath("/cart");
		return { message: "cart updated" };
	} catch (error) {
		return renderError(error);
	}
};
