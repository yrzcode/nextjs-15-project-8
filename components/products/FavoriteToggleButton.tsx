import FavoriteToggleForm from "@/components/products/FavoriteToggleForm";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "@/components/form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";

export default async function FavoriteToggleButton({
	productId,
}: { productId: string }) {
	const { userId } = await auth();
	if (!userId) return <CardSignInButton />;
	const favoriteId = await fetchFavoriteId({ productId });

	return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
}
