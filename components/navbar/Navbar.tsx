import Container from "../global/Contain";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { Suspense } from "react";

export default function Navbar() {
	return (
		<nav className="border-b">
			<Container
				className="flex flex-col flex-wrap py-8 
      sm:flex-row sm:items-center sm:justify-between"
			>
				<Logo />
				<Suspense>
					<NavSearch />
				</Suspense>
				<div className="flex items-center gap-4">
					<CartButton />
					<DarkMode />
					<LinksDropdown />
				</div>
			</Container>
		</nav>
	);
}
