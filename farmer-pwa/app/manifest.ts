// Task: Configure the SoilCare Progressive Web App manifest.

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SoilCare",
    short_name: "SoilCare",
    description:
      "AI-Powered Soil Analysis and Crop Recommendation System",
    start_url: "/home",
    display: "standalone",
    background_color: "#F7FAF5",
    theme_color: "#16824F",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}