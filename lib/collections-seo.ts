export const collectionSeo = {
  "atelier-weave": {
    title: "Atelier Weave | Natural Woven Wallcoverings | WEVINE",
    description:
      "Explore Atelier Weave, a premium collection of natural woven wallcoverings crafted from refined fibers for luxury residential, hospitality, and commercial interiors.",
    image: "/images/spaces/atelier-weave-space-board.jpg",
    code: "AW",
    productCount: 34,
  },
  "timber-trace": {
    title: "Timber Trace | Natural Woven Wallcoverings | WEVINE",
    description:
      "Discover Timber Trace, a collection of natural woven wallcoverings inspired by weathered wood, organic grain and architectural textures for residential, hospitality and commercial interiors.",
    image: "/images/spaces/timber-trace-space-board.jpg",
    code: "TT",
    productCount: 26,
  },
  "drift-weave": {
    title: "Drift Weave | Natural Woven Wallcoverings | WEVINE",
    description:
      "Explore Drift Weave, a collection of natural woven wallcoverings featuring soft movement, refined woven textures and tonal depth for residential, hospitality and commercial interiors.",
    image: "/images/spaces/drift-weave-space-board.jpg",
    code: "DW",
    productCount: 16,
  },
  "totem-grain": {
    title: "Totem Grain | Natural Woven Wallcoverings | WEVINE",
    description:
      "Discover Totem Grain, a collection of natural woven wallcoverings featuring expressive organic patterns and handcrafted textures for residential, hospitality and commercial interiors.",
    image: "/images/spaces/totem-grain-space-board.jpg",
    code: "TG",
    productCount: 26,
  },
} as const;

export type CollectionSlug = keyof typeof collectionSeo;