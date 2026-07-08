import type { Metadata } from "next";
import CollectionPageClient from "./CollectionPageClient";
import { collectionSeo, type CollectionSlug } from "@/lib/collections-seo";
import { collectionJsonLd } from "@/lib/schema";

const siteUrl = "https://wevinewallcoverings.com";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = collectionSeo[slug as CollectionSlug];

  if (!seo) {
    return {
      title: "Collections | WEVINE",
      description:
        "Explore WEVINE natural woven wallcoverings for residential, hospitality, and commercial interiors.",
    };
  }

  const canonicalUrl = `${siteUrl}/collections/${slug}`;
  const imageUrl = `${siteUrl}${seo.image}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "WEVINE",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const seo = collectionSeo[slug as CollectionSlug];

  return (
    <>
      {seo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionJsonLd(slug as CollectionSlug)),
          }}
        />
      )}

      <CollectionPageClient />
    </>
  );
}