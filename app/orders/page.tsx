import SectionTitle from "@/components/global/SectionTitle";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { fetchUserOrders } from "@/utils/actions/order";
import { formatCurrency, formatDate } from "@/utils/format";

export default async function OrdersPage() {
	const orders = await fetchUserOrders();
	return (
		<>
			<SectionTitle text="Your Orders" />
			<Table>
				<TableCaption>Total Orders: {orders.length}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Products</TableHead>
						<TableHead>Order Total</TableHead>
						<TableHead>Tax</TableHead>
						<TableHead>Shipping</TableHead>
						<TableHead>Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => {
						const { id, products, orderTotal, tax, shipping, createdAt } =
							order;
						return (
							<TableRow key={id}>
								<TableCell>{products}</TableCell>
								<TableCell>{formatCurrency(orderTotal)}</TableCell>
								<TableCell>{formatCurrency(tax)}</TableCell>
								<TableCell>{formatCurrency(shipping)}</TableCell>
								<TableCell>{formatDate(createdAt)}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}
