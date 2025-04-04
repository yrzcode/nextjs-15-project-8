"use client";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster />
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</>
	);
}
