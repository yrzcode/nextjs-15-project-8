"use server";

import db from "@/utils/db";
import { renderError } from "@/utils/actions/error";
import { getAdminUser, getAuthUser } from "@/utils/actions/user";
import { fetchOrCreateCart } from "@/utils/actions";
import { redirect } from "next/navigation";

export const createOrderAction = async () => {
	const user = await getAuthUser();
	let orderId: null | string = null;
	let cartId: null | string = null;

	try {
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});

		cartId = cart.id;

		await db.order.deleteMany({
			where: {
				clerkId: user.id,
				isPaid: false,
			},
		});

		const { emailAddresses } = user;
		const { numItemsInCart, orderTotal, tax, shipping } = cart;

		const order = await db.order.create({
			data: {
				clerkId: user.id,
				email: emailAddresses.at(0)?.emailAddress ?? "",
				products: numItemsInCart,
				orderTotal,
				tax,
				shipping,
			},
		});
		orderId = order.id;
	} catch (error) {
		return renderError(error);
	}

	redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
	const { id } = await getAuthUser();
	const orders = await db.order.findMany({
		where: {
			clerkId: id,
			isPaid: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return orders;
};

export const fetchAdminOrders = async () => {
	await getAdminUser();
	const orders = await db.order.findMany({
		where: {
			isPaid: true,
		},
	});
	return orders;
};
