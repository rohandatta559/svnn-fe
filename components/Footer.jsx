import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-choco/10 bg-choco text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src="/brand/trukid-logo.png" alt="TruKid" className="h-12 w-auto rounded-md" />
            <p className="mt-3 max-w-xs text-sm leading-7 text-white/60">
              Small-batch eclairs, jellies, candies, lollipops and chocolate — made with no shortcuts.
            </p>
          </div>
          <div>
            <p className="tracked-mono mb-4 text-xs uppercase text-brand-gold">Explore</p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <Link href="/products" className="hover:text-white">Products</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <p className="tracked-mono mb-4 text-xs uppercase text-brand-gold">Contact</p>
            <p className="text-sm leading-7 text-white/70">
              support@svnnfoods.com<br />
              +91 81252 88125
            </p>
          </div>
        </div>
        <p className="mt-12 text-xs text-white/40">
          © {new Date().getFullYear()} TruKid Confectionery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
