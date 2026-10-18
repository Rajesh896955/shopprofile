import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopprofiles.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/myProfile",
          "/myProfile/",
          "/dashboard",
          "/dashboard/",
          "/header",
          "/fotter",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/myProfile",
          "/myProfile/",
          "/dashboard",
          "/dashboard/",
          "/header",
          "/fotter",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
