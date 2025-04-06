"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();
	return (
		<aside>
			{adminLinks.map((link) => {
				const isActivePage = pathname === link.href;
				const variant = isActivePage ? "default" : "ghost";
				return (
					<Button
						key={link.href}
						asChild
						className="w-full mb-2 capitalize font-normal justify-start"
						variant={variant}
					>
						<Link href={link.href}>{link.label}</Link>
					</Button>
				);
			})}
		</aside>
	);
}
