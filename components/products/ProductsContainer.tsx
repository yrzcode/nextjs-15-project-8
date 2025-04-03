import ProductsGrid from "@/components/products/ProductsGrid";
import ProductsList from "@/components/products/ProductsList";
import Link from "next/link";
import { fetchAllProducts } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";

export default async function ProductsContainer({
	layout,
	search,
}: { layout: string; search: string }) {
	const products = await fetchAllProducts({ search });
	const totalProducts = products.length;
	const searchTerm = search ? `&search=${search}` : "";
	return (
		<>
			<section>
				<div className="flex justify-between items-center">
					<h4 className="font-medium text-lg">
						{totalProducts} product{totalProducts > 1 && "s"}
					</h4>
					<div className="flex gap-x-4">
						<Button
							variant={layout === "grid" ? "default" : "ghost"}
							size="icon"
							asChild
						>
							<Link href={`/products?layout=grid${searchTerm}`}>
								<LuLayoutGrid />
							</Link>
						</Button>

						<Button
							variant={layout === "list" ? "default" : "ghost"}
							size="icon"
							asChild
						>
							<Link href={`/products?layout=list${searchTerm}`}>
								<LuLayoutList />
							</Link>
						</Button>
					</div>
				</div>

				<Separator className="mt-4" />
			</section>
			<div>
				{totalProducts === 0 ? (
					<h5 className="text-2xl mt-16">
						Sorry, no products matched your search...
					</h5>
				) : layout === "grid" ? (
					<ProductsGrid products={products} />
				) : (
					<ProductsList products={products} />
				)}
			</div>
		</>
	);
}
