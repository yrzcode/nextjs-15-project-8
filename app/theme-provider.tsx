"use client";
import {
	type ThemeProviderProps,
	ThemeProvider as NextThemesProvider,
} from "next-themes";
import * as React from "react";

export default function ThemeProvider({
	children,
	...props
}: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
