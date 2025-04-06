import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
			{
				protocol: "https",
				hostname: "clxuptaqlklkgcemaull.supabase.co",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "1gb",
		},
	},
};

export default nextConfig;
