"use client";

import axios from "axios";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function CheckoutPage() {
	const searchParams = useSearchParams();
	const cartId = searchParams.get("cartId");
	const orderId = searchParams.get("orderId");
	const fetchClientSecret = useCallback(async () => {
		const res = await axios.post("/api/payment", { orderId, cartId });
		return res.data.clientSecret;
	}, [orderId, cartId]);

	const options = {
		fetchClientSecret,
	};

	return (
		<div id="checkout">
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	);
}
