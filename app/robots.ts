import { MetadataRoute } from "next";
import config from "@/lib/config-env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/user", "/api/", "/onboarding"],
    },
    sitemap: `${config.env.nextPublicUrl}/sitemap.xml`,
  };
}
