import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export enum Mode {
	SingleProduct = "singleProduct",
	CartItem = "cartItem",
}

type SelectProductAmountProps = {
	mode: Mode.SingleProduct;
	amount: number;
	setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
	mode: Mode.CartItem;
	amount: number;
	setAmount: (value: number) => Promise<void>;
	isLoading: boolean;
};

export default function SelectProductAmount(
	props: SelectProductAmountProps | SelectCartItemAmountProps,
) {
	const { mode, amount, setAmount } = props;
	const isCartItem = mode === Mode.CartItem;
	const isLoading = isCartItem ? props.isLoading : false;
	return (
		<>
			<h4 className="mb-2">Amount : </h4>
			<Select
				defaultValue={amount.toString()}
				onValueChange={(value) => {
					setAmount(+value);
				}}
				disabled={isLoading}
			>
				<SelectTrigger className={isCartItem ? "w-[100px]" : "w-[150px]"}>
					<SelectValue placeholder={amount} />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: isCartItem ? amount + 10 : 10 }, (_, index) => {
						const selectValue = (index + 1).toString();
						return (
							<SelectItem key={selectValue} value={selectValue}>
								{selectValue}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</>
	);
}
