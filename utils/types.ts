export type ActionFunction<T> = (
	prevState: T,
	formData: FormData,
) => Promise<T>;

export type CartItem = {
	productId: string;
	image: string;
	title: string;
	price: string;
	amount: number;
	company: string;
};

export type CartState = {
	cartItems: CartItem[];
	numItemsInCart: number;
	cartTotal: number;
	shipping: number;
	tax: number;
	orderTotal: number;
};
