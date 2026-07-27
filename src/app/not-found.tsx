import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-[0.4em] uppercase opacity-40">404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Room Not Found</h1>
      <p className="mt-4 max-w-md text-sm opacity-50">
        This door leads nowhere — much like the first artwork in the exhibition.
      </p>
      <Link
        href="/"
        className="mt-10 border border-charcoal/20 px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all hover:border-violet-accent dark:border-warm-white/20"
        data-cursor-hover
      >
        Return to Exhibition
      </Link>
    </section>
  );
}
