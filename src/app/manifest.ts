import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Seniore.ro — Portal Cămine de Bătrâni",
    short_name: "Seniore.ro",
    description:
      "Portal cu toate căminele de bătrâni din România. Caută cămin autorizat în județul tău.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f6f0",
    theme_color: "#c9a961",
    icons: [
      {
        src: "/logo-seniore.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-seniore.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
