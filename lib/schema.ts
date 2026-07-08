import { collectionSeo, type CollectionSlug } from "@/lib/collections-seo";

const siteUrl = "https://wevinewallcoverings.com";

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "WEVINE",
        url: siteUrl,
        logo: `${siteUrl}/images/brand/wevine-lockup-dark-transparent.svg`,
        description:
          "WEVINE creates refined natural woven wallcoverings for residential, hospitality, and commercial interiors.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "WEVINE",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "WEVINE | Natural Woven Wallcoverings",
        description:
          "Explore WEVINE natural woven wallcoverings crafted for refined residential, hospitality, and commercial interiors.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };
}

export function collectionJsonLd(slug: CollectionSlug) {
  const seo = collectionSeo[slug];

  const collectionUrl = `${siteUrl}/collections/${slug}`;
  const imageUrl = `${siteUrl}${seo.image}`;

  const collectionName = seo.title
    .replace(" | Natural Woven Wallcoverings | WEVINE", "")
    .replace(" | Natural Wallcoverings | WEVINE", "");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${collectionUrl}/#collectionpage`,
        url: collectionUrl,
        name: seo.title,
        description: seo.description,
        image: imageUrl,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${collectionUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Collections",
            item: `${siteUrl}/#collections`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: collectionName,
            item: collectionUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${collectionUrl}/#products`,
        name: `${collectionName} Product Selection`,
        itemListElement: Array.from(
          { length: seo.productCount },
          (_, index) => {
            const productNumber = String(index + 1).padStart(2, "0");
            const productCode = `${seo.code}-${productNumber}`;

            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                "@id": `${collectionUrl}#${productCode.toLowerCase()}`,
                name: `${productCode} ${collectionName} Natural Wallcovering`,
                sku: productCode,
                brand: {
                  "@id": `${siteUrl}/#organization`,
                },
                category: "Natural Woven Wallcovering",
                material: "Natural fiber",
                image: `${siteUrl}/images/products/${slug}/${slug}-${productNumber}.jpg`,
                url: collectionUrl,
                description: `${productCode} is part of the ${collectionName} natural woven wallcovering collection by WEVINE.`,
              },
            };
          }
        ),
      },
    ],
  };
}