import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LoadingContainer from "@/components/global/LoadingContainer";
import { Suspense } from "react";

export default function HomePage() {
	return (
		<>
			<Hero />
			<Suspense fallback={<LoadingContainer />}>
				<FeaturedProducts />
			</Suspense>
		</>
	);
}
