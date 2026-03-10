import { MetadataRoute } from "next";
import config from "@/lib/config-env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/user", "/api/", "/onboarding"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/user", "/api/", "/onboarding"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${config.env.nextPublicUrl}/sitemap.xml`,
  };
}
