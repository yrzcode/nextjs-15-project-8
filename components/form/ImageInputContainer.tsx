"use client";

import Image from "next/image";
import FormContainer from "@/components/form/FormContainer";
import ImageInput from "@/components/form/ImageInput";
import type { ActionFunction } from "@/utils/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "./Buttons";

type ImageInputContainerProps = {
	image: string;
	name: string;
	action: ActionFunction<{ message: string }>;
	text: string;
	children?: React.ReactNode;
};

export default function ImageInputContainer({
	image,
	name,
	action,
	text,
	children,
}: ImageInputContainerProps) {
	const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

	return (
		<div className="mb-8">
			<Image
				src={image}
				alt={name}
				width={200}
				height={200}
				className="rounded object-cover mb-4 w-[200px] h-[200px] priority"
			/>
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					setIsUpdateFormVisible((prev) => !prev);
				}}
			>
				{text}
			</Button>
			{isUpdateFormVisible && (
				<div className="max-w-md mt-4">
					<FormContainer action={action}>
						{children}
						<ImageInput />
						<SubmitButton size="sm" text={text} />
					</FormContainer>
				</div>
			)}
		</div>
	);
}
