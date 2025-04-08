"use client";

import FormContainer from "@/components/form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { usePathname } from "next/navigation";
import { CardSubmitButton } from "../form/Buttons";

export default function FavoriteToggleForm({
	productId,
	favoriteId,
}: { productId: string; favoriteId: string | null }) {
	const pathname = usePathname();
	const toggleAction = toggleFavoriteAction.bind(null, {
		productId,
		favoriteId,
		pathname,
	});
	return (
		<FormContainer action={toggleAction}>
			<CardSubmitButton isFavorite={!!favoriteId} />
		</FormContainer>
	);
}
