"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function SignOutLink() {
	const handleLogout = () => {
		toast("Logout", { description: "logout successfully" });
	};
	return (
		<SignOutButton>
			<DropdownMenuItem>
				<Link href="/" className="w-full text-left" onClick={handleLogout}>
					Logout
				</Link>
			</DropdownMenuItem>
		</SignOutButton>
	);
}
