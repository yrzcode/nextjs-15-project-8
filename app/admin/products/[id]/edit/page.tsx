import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "../../../../../components/form/CheckboxInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import {
	fetchAdminProductDetail,
	updateProductAction,
	updateProductImageAction,
} from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";

export default async function EditProductPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const product = await fetchAdminProductDetail(id);
	if (!product) return null;
	const { name, company, description, featured, price, image } = product;
	return (
		<section>
			<h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
			<div className="border p-8 rounded">
				<ImageInputContainer
					image={image}
					name={name}
					action={updateProductImageAction}
					text="update image"
				>
					<input type="hidden" name="id" value={id} />
					<input type="hidden" name="url" value={image} />
				</ImageInputContainer>
				<FormContainer action={updateProductAction}>
					<div className="grid gap-4 md:grid-cols-2 my-4">
						<input type="hidden" name="id" value={id} />
						<FormInput
							type="text"
							name="name"
							label="product name"
							defaultValue={name}
						/>
						<FormInput
							type="text"
							name="company"
							label="company"
							defaultValue={company}
						/>
						<PriceInput defaultValue={price} />
					</div>
					<TextAreaInput
						name="description"
						labelText="product description"
						defaultValue={description}
					/>
					<div className="mt-6">
						<CheckboxInput
							name="featured"
							label="featured"
							defaultChecked={featured}
						/>
					</div>
					<SubmitButton text="update product" className="mt-8" />
				</FormContainer>
			</div>
		</section>
	);
}
