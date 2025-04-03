import ProductsContainer from "@/components/products/ProductsContainer";
import Server from "./Server";
import Client from "./Client";

export default function ProductsPage({
	searchParams,
}: { searchParams: { layout?: string; search?: string } }) {
	const layout = searchParams.layout ?? "grid";
	const search = searchParams.search ?? "";
	return <ProductsContainer layout={layout} search={search} />;
}
