"use client";

import SelectProductAmount, {
	Mode,
} from "../single-product/SelectProductAmount";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { useState } from "react";
import { removeCartItemAction } from "@/utils/actions/cart";
import { toast } from "sonner";
import { updateCartItemAction } from "@/utils/actions/cart";

export default function ThirdColumn({
	quantity,
	id,
}: { quantity: number; id: string }) {
	const [amount, setAmount] = useState(quantity);
	const [isLoading, setIsLoading] = useState(false);

	const handleAmountChange = async (value: number) => {
		setIsLoading(true);
		toast("", { description: "Calculating..." });
		const res = await updateCartItemAction({
			amount: value,
			cartItemId: id,
		});
		setAmount(value);
		toast("", { description: res.message });
		setIsLoading(false);
	};

	return (
		<div className="md:ml-8">
			<SelectProductAmount
				amount={amount}
				setAmount={handleAmountChange}
				mode={Mode.CartItem}
				isLoading={false}
			/>
			<FormContainer action={removeCartItemAction}>
				<input type="hidden" name="id" value={id} />
				<SubmitButton size="sm" className="mt-4" text="remove" />
			</FormContainer>
		</div>
	);
}
