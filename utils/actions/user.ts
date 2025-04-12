"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) redirect("/");
	return user;
};

export const getAdminUser = async () => {
	const user = await currentUser();
	if (user?.id !== process.env.ADMIN_USER_ID) redirect("/");
	return user;
};
