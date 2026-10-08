import type { Metadata } from "next";
import { site } from "@/data/site";

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Mio-haimiya portfolio preview with Haimiya-senpai artwork",
  type: "image/png",
};

interface PageMetaOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function pageMetadata({
  title,
  description = site.description,
  path = "/",
}: PageMetaOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: "Anya",
      alternateName: [site.name, site.username],
      url: site.url,
      image: `${site.url}/images/haimiya/avatar.png`,
      jobTitle: "Student Developer",
      description: site.description,
      address: { "@type": "PostalAddress", addressRegion: "Karnataka", addressCountry: "IN" },
      sameAs: [
        "https://github.com/Itz-Anya",
        "https://instagram.com/itz.mio.haimiya",
        "https://t.me/SylveonHere",
      ],
    },
  ],
};
