"use client";

import SelectProductAmount, {
	Mode,
} from "@/components/single-product/SelectProductAmount";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import FormContainer from "@/components/form/FormContainer";
import { addToCartAction } from "@/utils/actions";
import { ProductSignInButton, SubmitButton } from "@/components/form/Buttons";

export default function AddToCart({ productId }: { productId: string }) {
	const [amount, setAmount] = useState(1);
	const { userId } = useAuth();
	return (
		<div className="mt-4">
			<SelectProductAmount
				mode={Mode.SingleProduct}
				amount={amount}
				setAmount={setAmount}
			/>
			{userId ? (
				<FormContainer action={addToCartAction}>
					<input type="hidden" name="productId" value={productId} />
					<input type="hidden" name="amount" value={amount} />
					<SubmitButton text="add to cart" className="mt-8" />
				</FormContainer>
			) : (
				<ProductSignInButton />
			)}
		</div>
	);
}
