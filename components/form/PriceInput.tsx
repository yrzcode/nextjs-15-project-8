import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputNumberProps = {
	defaultValue?: number;
};

export default function PriceInput({ defaultValue }: FormInputNumberProps) {
	const name = "price";
	return (
		<div className="mb-2">
			<Label htmlFor={name} className="capitalize">
				Price ($)
			</Label>
			<Input
				id={name}
				type="number"
				name={name}
				min={0}
				defaultValue={defaultValue || 100}
				required
			/>
		</div>
	);
}
