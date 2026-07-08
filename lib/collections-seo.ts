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
    title: "Timber Trace | Natural Wallcoverings | WEVINE",
    description:
      "Discover Timber Trace natural wallcoverings, inspired by weathered wood, organic grain, and warm architectural textures for refined interiors.",
    image: "/images/spaces/timber-trace-space-board.jpg",
    code: "TT",
    productCount: 28,
  },
  "drift-weave": {
    title: "Drift Weave | Natural Wallcoverings | WEVINE",
    description:
      "Explore Drift Weave, a soft flowing wallcovering collection with quiet movement, subtle woven texture, and tonal depth.",
    image: "/images/spaces/drift-weave-space-board.jpg",
    code: "DW",
    productCount: 16,
  },
  "totem-grain": {
    title: "Totem Grain | Natural Wallcoverings | WEVINE",
    description:
      "Discover Totem Grain natural wallcoverings, shaped by organic patterns, crafted textures, and expressive woven rhythm.",
    image: "/images/spaces/totem-grain-space-board.jpg",
    code: "TG",
    productCount: 26,
  },
  "palette-weave": {
    title: "Palette Weave | Natural Wallcoverings | WEVINE",
    description:
      "Explore Palette Weave, a refined natural wallcovering collection with soft color, woven depth, and versatile interior applications.",
    image: "/images/spaces/palette-weave-space-board.jpg",
    code: "PW",
    productCount: 24,
  },
} as const;

export type CollectionSlug = keyof typeof collectionSeo;