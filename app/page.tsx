import HomePageClient from "./HomePageClient";
import { homeJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd()),
        }}
      />

      <HomePageClient />
    </>
  );
}