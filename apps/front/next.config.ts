import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    turbopackFileSystemCacheForDev: false,
    optimizeCss: false, // Désactive l'optimisation CSS si problème
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nyacwcdboadtzhdyaerb.supabase.co",
        port: "",
        pathname: "/**",
      },
      
    ],
    // Alternative plus simple :
    // domains: ["nyacwcdboadtzhdyaerb.supabase.co"],
  },
  reactCompiler: true,
};

export default nextConfig;
