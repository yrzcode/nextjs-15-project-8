"use client";

import type { ActionFunction } from "@/utils/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
	message: "",
};

type FormContainerProps = {
	action: ActionFunction<typeof initialState>;
	children: React.ReactNode;
};

export default function FormContainer({
	action,
	children,
}: FormContainerProps) {
	const [state, formAction] = useActionState(action, initialState);
	useEffect(() => {
		if (state.message) {
			toast("", { description: state.message });
		}
	}, [state]);

	return <form action={formAction}>{children}</form>;
}
