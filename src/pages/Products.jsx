import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import navLogo from "../assets/favicon.png";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import "../index.css";

const products = [
  {
    image: product2,
    title: "Velvet Cat",
    material: "Damask · Brass snap",
    blurb:
      "Baroque blue scrollwork wrapped around a silver feline silhouette, made for nights that refuse ordinary.",
    tone: "from-from/80 via-plume to-void",
    accent: "text-copper",
    price: "R120",
  },
  {
    image: product1,
    title: "Cork Elephant",
    material: "Natural cork · Embroidery",
    blurb:
      "Raw cork grain meets a hand-stitched elephant, earthy weight with a quiet stare.",
    tone: "from-leather/40 via-ink to-void",
    accent: "text-copper",
    price: "R150",
  },
  {
    image: product3,
    title: "Heart Croc",
    material: "Embossed leather · Gold studs",
    blurb:
      "A rigid crimson heart with crocodile texture and a diagonal strap pinned in antique gold.",
    tone: "from-copper/35 via-from to-void",
    accent: "text-copper",
    price: "R350",
  },
  {
    image: product1,
    title: "Moss Raven",
    material: "Suede · Bone clasp",
    blurb:
      "Deep forest green suede folded into a soft pouch, finished with a carved bone clasp.",
    tone: "from-velvet/50 via-plume to-void",
    accent: "text-copper",
    price: "R280",
  },
  {
    image: product3,
    title: "Gilded Moth",
    material: "Silk lining · Brass chain",
    blurb:
      "A night-sky clutch with moth embroidery and a brass chain meant to catch candlelight.",
    tone: "from-ink via-plume to-void",
    accent: "text-copper",
    price: "R420",
  },
  {
    image: product2,
    title: "Ash Fox",
    material: "Vegetable leather · Waxed thread",
    blurb:
      "Smoke-grey leather cut slim for daily carry, stitched in waxed thread that ages with you.",
    tone: "from-slate/40 via-ink to-void",
    accent: "text-copper",
    price: "R310",
  },
  {
    image: product2,
    title: "Obsidian Owl",
    material: "Black calf · Silver rivets",
    blurb:
      "A compact wallet with an owl silhouette pressed into black calf and sealed with silver rivets.",
    tone: "from-void via-plume to-ink",
    accent: "text-copper",
    price: "R190",
  },
  {
    image: product1,
    title: "Thorn Bloom",
    material: "Floral damask · Rose hardware",
    blurb:
      "Petal-soft fabric over a structured frame, finished with rose-toned hardware that refuses to whisper.",
    tone: "from-leather/30 via-plume to-void",
    accent: "text-copper",
    price: "R360",
  },
  {
    image: product3,
    title: "Night Orchid",
    material: "Velvet · Antique buckle",
    blurb:
      "Plush velvet in near-black purple, held shut by an antique buckle salvaged from a quieter century.",
    tone: "from-velvet/60 via-from to-void",
    accent: "text-copper",
    price: "R480",
  },
];

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const nodes = root.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function ProductCard({ product, index }) {
  const delayClass =
    ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][index % 3] ??
    "reveal-delay-1";

  return (
    <article
      className={`reveal ${delayClass} relative overflow-hidden rounded bg-linear-to-br ${product.tone} p-6 md:p-8`}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-80 w-full rounded-lg object-cover pb-8"
      />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl text-moon md:text-3xl">
          {product.title}
        </h3>
        <span className="font-body text-xs tracking-widest text-mist uppercase">
          {product.price}
        </span>
      </div>
      <p
        className={`mt-4 text-sm tracking-widest uppercase ${product.accent}`}
      >
        {product.material}
      </p>
      <p className="mt-4 text-base leading-relaxed text-sand/80">
        {product.blurb}
      </p>
    </article>
  );
}

function Products() {
  const pageRef = useReveal();

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-void text-sand"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 texture-stars opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 texture-grain opacity-[0.07] mix-blend-overlay"
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-50 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={navLogo}
              alt="OddOwl"
              className="h-10 w-10 transition duration-500"
            />
          </Link>
          <Link
            to="/"
            className="font-body text-sm tracking-widest text-mist uppercase transition hover:text-moon"
          >
            Back Home
          </Link>
        </div>
      </header>

      <main className="relative z-10 border-t border-sand/10 pt-28 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal">
            <p className="font-display text-xl text-copper">The Full Nest</p>
            <h1 className="mt-2 font-display text-4xl tracking-wide text-moon md:text-6xl">
              All Products
            </h1>
            <div className="mt-5 h-px w-28 bg-brass/70" />
            <p className="mt-5 max-w-xl text-lg text-mist">
              More peculiar pieces from the bench — each one a material, a motif,
              and a mood finished only when it feels unmistakably yours.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.title}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex border-t border-sand/10 px-10 py-6">
        <p className="font-body text-xs text-mist/70">
          © {new Date().getFullYear()} OddOwl, All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default Products;
