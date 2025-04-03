import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

export default async function FeaturedProducts() {
	const products = await fetchFeaturedProducts();

	if (!products.length) {
		return <EmptyList />;
	}

	return (
		<section className="pt-24">
			<SectionTitle text="featured products" />
			<ProductsGrid products={products} />
		</section>
	);
}
