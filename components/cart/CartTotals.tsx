import FormContainer from "@/components/form/FormContainer";
import type { Cart } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import { Separator } from "@/components/ui/separator";
import { Card, CardTitle } from "@/components/ui/card";
import { createOrderAction } from "@/utils/actions/order";
import { SubmitButton } from "@/components/form/Buttons";

export default function CartTotals({ cart }: { cart: Cart }) {
	const { cartTotal, shipping, tax, orderTotal } = cart;

	return (
		<div>
			<Card className="p-8">
				<CartTotalRow label="Subtotal" amount={cartTotal} />
				<CartTotalRow label="Shipping" amount={shipping} />
				<CartTotalRow label="Tax" amount={tax} />
				<CardTitle className="mt-8">
					<CartTotalRow label="Order Total" amount={orderTotal} lastRow />
				</CardTitle>
			</Card>
			<FormContainer action={createOrderAction}>
				<SubmitButton text="Place Order" className="w-full mt-8" />
			</FormContainer>
		</div>
	);
}

const CartTotalRow = ({
	label,
	amount,
	lastRow,
}: {
	label: string;
	amount: number;
	lastRow?: boolean;
}) => {
	return (
		<>
			<p className="flex justify-between text-sm">
				<span>{label}</span>
				<span>{formatCurrency(amount)}</span>
			</p>
			{lastRow ? null : <Separator className="my-2" />}
		</>
	);
};
