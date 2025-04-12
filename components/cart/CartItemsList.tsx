import ThirdColumn from "@/components/cart/ThirdColumn";
import type { CartItemWithProduct } from "@/utils/types";
import { Card } from "@/components/ui/card";
import { FourthColum } from "./CartItemsColumns";
import {
	FirstColumn,
	SecondaryColumn,
} from "@/components/cart/CartItemsColumns";

export default function CartItemsList({
	cartItems,
}: { cartItems: CartItemWithProduct[] }) {
	return (
		<div>
			{cartItems.map((cartItem) => {
				const { id, amount, product } = cartItem;
				const { id: productId, name, image, company, price } = product;

				return (
					<Card
						key={id}
						className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
					>
						<FirstColumn name={name} image={image} />
						<SecondaryColumn
							name={name}
							company={company}
							productId={productId}
						/>
						<ThirdColumn id={id} quantity={amount} />
						<FourthColum price={price} />
					</Card>
				);
			})}
		</div>
	);
}
