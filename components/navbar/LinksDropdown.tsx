import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { LuAlignLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { links } from "@/utils/links";
import Link from "next/link";
import UserIcon from "@/components/navbar/UserIcon";
import SignOutLink from "@/components/navbar/SignOutLink";
import { auth } from "@clerk/nextjs/server";

export default async function LinksDropdown() {
	const { userId } = await auth();
	const isAdmin = userId === process.env.ADMIN_USER_ID;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex gap-4 max-w-[100px]">
					<LuAlignLeft className="w-6 h-6" />
					<UserIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="start" sideOffset={10}>
				<SignedOut>
					<DropdownMenuItem>
						<SignInButton mode="modal">
							<button type="button" className="w-full text-left">
								Login
							</button>
						</SignInButton>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<SignUpButton mode="modal">
							<button type="button" className="w-full text-left">
								Register
							</button>
						</SignUpButton>
					</DropdownMenuItem>
				</SignedOut>
				<SignedIn>
					{links.map((link) => {
						if (link.label === "dashboard" && !isAdmin) return null;
						return (
							<DropdownMenuItem key={link.href}>
								<Link href={link.href} className="capitalize w-full">
									{link.label}
								</Link>
							</DropdownMenuItem>
						);
					})}
					<DropdownMenuSeparator />
					<SignOutLink />
				</SignedIn>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
