import { useEffect, useRef, useState } from "react";
import heroImg from "../assets/hero.png";
import logoImg from "../assets/logo.png";
import navLogo from "../assets/favicon.png";
import "../index.css";
import { Link } from "react-router-dom";
import product1 from '../assets/product1.png'; 
import product2 from '../assets/product2.png'; 
import product3 from '../assets/product3.png'; 

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const projects = [
  { 
    image: product2,
    title: "Velvet Cat",
    material: "Damask · Brass snap",
    blurb:
      "Baroque blue scrollwork wrapped around a silver feline silhouette — made for nights that refuse ordinary.",
    tone: "from-from/80 via-plume to-void",
    accent: "text-copper",
  },
  {
    image: product1,
    title: "Cork Elephant",
    material: "Natural cork · Embroidery",
    blurb:
      "Raw cork grain meets a hand-stitched elephant — earthy weight with a quiet stare.",
    tone: "from-leather/40 via-ink to-void",
    accent: "text-copper",
  },
  {
    image: product3,
    title: "Heart Croc",
    material: "Embossed leather · Gold studs",
    blurb:
      "A rigid crimson heart with crocodile texture and a diagonal strap pinned in antique gold.",
    tone: "from-copper/35 via-from to-void",
    accent: "text-copper",
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

function App() {
  const pageRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    setStatus(
      name
        ? `Thanks, ${name}. We'll write back about your custom piece.`
        : "Thanks — we'll write back about your custom piece.",
    );
    form.reset();
  }

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

      {/* —— Nav —— */}
      <header className="fixed inset-x-0 top-0 z-50 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <img
              src={navLogo}
              alt="OddOwl"
              className="h-10 w-10 transition duration-500"
            />
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-widest text-mist uppercase transition hover:text-moon"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-px w-6 bg-sand transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-sand transition ${menuOpen ? "translate-y-[-3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute inset-x-0 top-0 border-b border-sand/10 bg-void/95 px-5 pb-8 pt-20 backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl tracking-wide text-sand"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* —— Hero —— */}
        <section className="relative flex min-h-dvh items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="OddOwl Handcrafted Bags On Deep Velvet"
              className="anim-drift h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-void via-void/55 to-plume/30" />
            <div className="absolute inset-0 bg-linear-to-r from-void/70 via-transparent to-void/40" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
            <p className="anim-rise font-display text-sm text-copper md:text-xl">
              Established For The Peculiar
            </p>
            <h1 className="anim-brand mt-4 font-bold italic font-display text-6xl text-moon sm:text-6xl md:text-8xl lg:text-[200px]">
              OddOwl
            </h1>
            <div className="anim-line mt-5 h-px w-28 bg-brass/70 md:w-40" />
            <p className="anim-rise-delay mt-6 max-w-md font-body text-lg leading-relaxed text-sand/90 md:text-xl">
              Handcrafted Leather & Material Bags, Wallets...
            </p>
            <div className="anim-rise-delay mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-leather rounded uppercase px-8 py-4 font-body tracking-widest text-md text-moon transition hover:bg-copper"
              >
                See The Work
              </a>
              <a
                href="#contact"
                className="border border-leather uppercase rounded px-8 py-4 font-body text-md tracking-widest text-moon transition hover:border-copper"
              >
                Request A Custom
              </a>
            </div>
          </div>
        </section>

        {/* —— Projects —— */}
        <section
          id="projects"
          className="relative z-10 border-t border-sand/10 py-24 md:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex justify-start">
              <div className="reveal w-full">
                  <p className="font-display  text-xl text-copper">Selected pieces</p>
      
                <h2 className="mt-2 font-display text-4xl tracking-wide text-moon md:text-6xl">
                  Products worth keeping strange
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-mist">
                  Each commission starts as a material, a motif, and a mood —
                  finished only when it feels unmistakably yours.
                </p>
              </div>
            </div>
              <div className="mt-5 flex justify-start">
                  <Link
                  to="/products"
                  className="bg-leather px-7 py-3.5 font-body text-sm tracking-[0.22em] text-moon uppercase shadow-[inset_0_0_0_1px_rgb(232_224_212/0.25)] transition hover:bg-copper"
                  >
                  Show All Products
                  </Link>
              </div>
            <div className="mt-16 flex gap-6 lg:gap-8">
  
              <div className=" flex gap-6 lg:col-span-7">
                {projects.map((project, index) => (
                  <article
                    key={project.title}
                    className={`flex-1 reveal ${["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][index]} relative overflow-hidden border border-sand/10 bg-linear-to-br ${project.tone} p-6 md:p-8`}
                   >
                   <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover rounded-lg pb-8"
                     />
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl text-moon md:text-3xl">

                        {project.title}
                      </h3>
                      <span className="font-body text-xs tracking-[0.2em] text-mist uppercase">
                        0{index + 1}
                      </span>
                    </div>
                    <p
                      className={`mt-4 text-sm tracking-[0.16em] uppercase ${project.accent}`}
                    >
                      {project.material}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-sand/80">
                      {project.blurb}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* —— About —— */}
        <section
          id="about"
          className="relative z-10 overflow-hidden py-24 md:py-32"
        >
          <div className="absolute inset-0 bg-linear-to-b from-void via-plume/80 to-void" />
          <div
            className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-velvet/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-leather/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
            <div className="reveal lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  className="absolute -inset-3 border border-brass/30"
                  aria-hidden="true"
                />
                <img
                  src={logoImg}
                  alt="OddOwl illustrated owl mark"
                  className="relative w-full bg-void object-cover"
                />
              </div>
            </div>

            <div className="reveal reveal-delay-1 lg:col-span-7">
              <p className="font-script text-xl text-copper">The odd craft</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-moon md:text-6xl">
                Leather, cork, and materials that misbehave beautifully
              </h2>
              <div className="mt-6 h-px w-24 bg-sand/35" />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist md:text-xl">
                OddOwl builds wallets and bags for people who collect oddities —
                tarot tables, late-night markets, and quiet rooms full of brass
                and dried flowers. Nothing here is mass-produced. Every stitch
                is placed for character, not catalogue uniformity.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist md:text-xl">
                Bring a sketch, a fabric scrap, or just a feeling. We translate
                it into hardware, grain, and silhouette — custom, tactile, and
                slightly unsettling in the best way.
              </p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                {["One-of-one builds", "Custom motifs", "Repair & remake"].map(
                  (item) => (
                    <li
                      key={item}
                      className="border-t border-sand/20 pt-3 font-body text-sm tracking-[0.14em] text-sand uppercase"
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* —— Contact —— */}
        <section
          id="contact"
          className="relative z-10 border-t border-sand/10 py-24 md:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
            <div className="reveal lg:col-span-5">
              <p className="font-script text-xl text-copper">
                Start something singular
              </p>
              <h2 className="mt-2 font-display text-4xl text-moon md:text-6xl">
                Commission a piece
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">
                Tell us what you're carrying — literally and otherwise. We'll
                reply with materials, timeline, and a path toward a bag only you
                will own.
              </p>
              <div className="mt-10 space-y-3 text-sand/80">
                <p className="font-body tracking-[0.12em] uppercase">
                  <span className="text-mist">Studio · </span>
                  By appointment
                </p>
                <a
                  href="mailto:hello@oddowl.studio"
                  className="inline-block border-b border-brass/50 pb-0.5 text-lg text-moon transition hover:border-copper hover:text-copper"
                >
                  hello@oddowl.studio
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="reveal reveal-delay-1 space-y-6 lg:col-span-7"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-body text-xs tracking-[0.2em] text-mist uppercase">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full border-0 border-b border-sand/25 bg-transparent py-3 font-body text-lg text-moon outline-none transition placeholder:text-mist/40 focus:border-copper"
                    placeholder="What should we call you?"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-body text-xs tracking-[0.2em] text-mist uppercase">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full border-0 border-b border-sand/25 bg-transparent py-3 font-body text-lg text-moon outline-none transition placeholder:text-mist/40 focus:border-copper"
                    placeholder="you@domain.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block font-body text-xs tracking-[0.2em] text-mist uppercase">
                  Piece in mind
                </span>
                <select
                  name="piece"
                  className="w-full appearance-none border-0 border-b border-sand/25 bg-transparent py-3 font-body text-lg text-moon outline-none transition focus:border-copper"
                  defaultValue="bag"
                >
                  <option value="bag" className="bg-ink">
                    Custom bag
                  </option>
                  <option value="wallet" className="bg-ink">
                    Wallet
                  </option>
                  <option value="both" className="bg-ink">
                    Bag & wallet set
                  </option>
                  <option value="other" className="bg-ink">
                    Something stranger
                  </option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-xs tracking-[0.2em] text-mist uppercase">
                  Vision
                </span>
                <textarea
                  name="vision"
                  rows={4}
                  required
                  className="w-full resize-y border-0 border-b border-sand/25 bg-transparent py-3 font-body text-lg text-moon outline-none transition placeholder:text-mist/40 focus:border-copper"
                  placeholder="Materials, motifs, size, mood…"
                />
              </label>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="submit"
                  className="bg-slate px-8 py-3.5 font-body text-sm tracking-[0.22em] text-moon uppercase transition hover:bg-leather"
                >
                  Send Inquiry
                </button>
                {status && (
                  <p className="font-script text-lg text-copper" role="status">
                    {status}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* —— Footer —— */}
      <footer className="relative z-10 border-t border-sand/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
                aria-hidden="true"
              />
              <p className="font-display text-2xl tracking-[0.2em] text-moon uppercase">
                OddOwl
              </p>
            </div>
            <p className="mt-3 max-w-xs font-script text-lg text-mist">
              Handcrafted for the peculiar few
            </p>
          </div>

          <div className="flex flex-wrap gap-8 font-body text-sm tracking-[0.18em] text-mist uppercase">
            <a href="#projects" className="transition hover:text-moon">
              Projects
            </a>
            <a href="#about" className="transition hover:text-moon">
              About
            </a>
            <a href="#contact" className="transition hover:text-moon">
              Contact
            </a>
          </div>

          <p className="font-body text-sm tracking-[0.12em] text-mist/70">
            © {new Date().getFullYear()} OddOwl · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
