import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/5 px-6 py-16 dark:border-warm-white/5 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg">2025: A Year of Closing Cycles</p>
          <p className="mt-1 text-sm opacity-50">An exhibition by Julio Parejo</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs tracking-widest uppercase opacity-50">
          <Link href="/about" className="transition-opacity hover:opacity-100" data-cursor-hover>
            About
          </Link>
          <Link href="/contact" className="transition-opacity hover:opacity-100" data-cursor-hover>
            Contact
          </Link>
          <Link href="/reflections" className="transition-opacity hover:opacity-100" data-cursor-hover>
            Reflections
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-100"
            data-cursor-hover
          >
            Instagram
          </a>
        </div>

        <p className="text-xs opacity-30">
          &copy; {new Date().getFullYear()} Julio Parejo
        </p>
      </div>
    </footer>
  );
}
