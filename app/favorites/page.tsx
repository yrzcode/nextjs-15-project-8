import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";

export default async function FavoritesPage() {
	const favorites = await fetchUserFavorites();
	if (!favorites) return <SectionTitle text="You have no favorites" />;
	return (
		<div>
			<SectionTitle text="Favorites" />
			<ProductsGrid
				products={favorites.map((favorite) => {
					return favorite.product;
				})}
			/>
		</div>
	);
}
