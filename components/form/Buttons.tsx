"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { LuFilePen } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { SignInButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type BtnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
	className?: string;
	text?: string;
	size?: BtnSize;
};

export const SubmitButton = ({
	className = "",
	text = "submit",
	size = "lg",
}: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			disabled={pending}
			className={cn("capitalize", className)}
			size={size}
		>
			{pending ? (
				<>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					Please wait...
				</>
			) : (
				text
			)}
		</Button>
	);
};

type ActionType = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: ActionType }) => {
	const { pending } = useFormStatus();
	const renderIcon = () => {
		switch (actionType) {
			case "edit":
				return <LuFilePen />;
			case "delete":
				return <LuTrash2 />;
			default: {
				const never: never = actionType;
				throw new Error(`Invalid action type: ${never}`);
			}
		}
	};
	return (
		<Button
			type="submit"
			size="icon"
			variant="link"
			className="p-2 cursor-pointer"
		>
			{pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
		</Button>
	);
};

export const CardSignInButton = () => {
	return (
		<SignInButton mode="modal">
			<Button
				type="button"
				size="icon"
				variant="outline"
				className="p-2 cursor-pointer"
				asChild
			>
				<FaRegHeart />
			</Button>
		</SignInButton>
	);
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			size="icon"
			variant="outline"
			className="p-2 cursor-pointer"
		>
			{pending ? (
				<ReloadIcon className="animate-spin" />
			) : isFavorite ? (
				<FaHeart />
			) : (
				<FaRegHeart />
			)}
		</Button>
	);
};
