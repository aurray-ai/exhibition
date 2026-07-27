import { notFound } from "next/navigation";
import { artworks, getArtworkBySlug, getAdjacentArtworks } from "@/data/artworks";
import ArtworkDetail from "@/components/artwork/ArtworkDetail";

export function generateStaticParams() {
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return { title: "Artwork Not Found" };

  return {
    title: `${artwork.title} | 2025: A Year of Closing Cycles`,
    description: artwork.story,
  };
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const { prev, next } = getAdjacentArtworks(slug);

  return <ArtworkDetail artwork={artwork} prev={prev} next={next} />;
}
