import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import navLogo from "../assets/favicon.png";
import products from "../data/products";
import "../index.css";

const WHATSAPP_NUMBER = "27768519561";

function useReveal(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const nodes = root.querySelectorAll(".reveal:not(.is-visible)");
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
  }, deps);

  return ref;
}

function buildWhatsAppMessage(cart) {
  const lines = cart.map(
    (item) => `• ${item.title} (${item.material}) — ${item.price}`,
  );
  const total = cart.reduce((sum, item) => sum + item.amount, 0);

  return [
    "Hello OddOwl,",
    "",
    "I'd like to order the following pieces:",
    "",
    ...lines,
    "",
    `Total: R${total}.00`,
    "",
    "Looking forward to hearing from you!",
  ].join("\n");
}

function ProductCard({ product, index, inCart, onAdd, onRemove }) {
  const delayClass =
    ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][index % 3] ??
    "reveal-delay-1";

  return (
    <article
  className={`reveal ${delayClass} relative flex flex-col overflow-hidden rounded bg-linear-to-br ${product.tone} p-6 md:p-8`}
    >
      <div>
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
      <p className={`mt-4 text-sm tracking-widest uppercase ${product.accent}`}>
        {product.material}
      </p>
      <p className="mt-4 mb-4 text-base leading-relaxed text-sand/80">
        {product.blurb}
      </p>
    </div>
      <button
        type="button"
        onClick={() => (inCart ? onRemove(product.title) : onAdd(product))}
        className={`mt-auto w-full rounded px-6 py-3 p-4 font-body text-sm tracking-widest uppercase transition ${
          inCart
            ? "border border-leather hover:border-copper"
            : "bg-leather text-moon hover:bg-copper"
        }`}
      >
        {inCart ? "Remove From Cart" : "Add To Cart"}
      </button>
    </article>
  );
}

function Products() {
  const [cart, setCart] = useState([]);
  const pageRef = useReveal([cart.length]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function addToCart(product) {
    setCart((prev) => {
      if (prev.some((item) => item.title === product.title)) return prev;
      return [...prev, product];
    });
  }

  function removeFromCart(title) {
    setCart((prev) => prev.filter((item) => item.title !== title));
  }

  function proceedWithOrder() {
    if (cart.length === 0) return;
    const message = buildWhatsAppMessage(cart);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0);
  const cartTitles = new Set(cart.map((item) => item.title));

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
          <div className="flex items-center gap-6">
            <a
              href="#order"
              className="font-body text-sm tracking-widest text-mist uppercase transition hover:text-moon"
            >
              <i class="fa-solid fa-cart-shopping"></i> Cart
              {cart.length > 0 ? ` (${cart.length})` : ""}
            </a>
            <Link
              to="/"
              className="font-body text-sm tracking-widest text-mist uppercase transition hover:text-moon"
            >
              Back Home
            </Link>
          </div>
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
            <p className="mt-5 w-full text-lg text-mist">
              More peculiar pieces from the bench, each one a material, a motif,
              and a mood finished only when it feels unmistakably yours. Add
              what you want to your cart, then send the order on WhatsApp.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.title}
                product={product}
                index={index}
                inCart={cartTitles.has(product.title)}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        </div>

        <section
          id="order"
          className="relative z-10 mt-24 border-t border-sand/10 pt-24 md:mt-32 md:pt-32"
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

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div className="reveal">
              <p className="font-display text-xl text-copper">Your Selection</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide text-moon md:text-6xl">
                Order Cart
              </h2>
              <div className="mt-5 h-px w-28 bg-brass/70" />
              <p className="mt-5 w-full text-lg text-mist">
                Review the pieces you have chosen. When you are ready, proceed
                and WhatsApp will open with a ready-made message for OddOwl. Please note that the following prices excludes any/all shipping costs.
              </p>
            </div>

            {cart.length === 0 ? (
              <p className="reveal reveal-delay-1 mt-12 font-body text-lg text-mist/70">
                Your Cart Is Empty. Add A Piece Above To Begin An Order.
              </p>
            ) : (
              <div className="reveal reveal-delay-1 mt-12 space-y-6">
                <ul className="divide-y divide-sand/10 border-y border-sand/10">
                  {cart.map((item) => (
                    <li
                      key={item.title}
                      className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-display italic text-2xl text-moon">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm tracking-widest text-copper uppercase">
                            {item.material}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-8 sm:justify-end">
                        <span className="font-body text-sm tracking-widest text-mist uppercase">
                          {item.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.title)}
                          className="font-body text-xs tracking-widest text-mist uppercase transition hover:text-copper"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-body text-2xl text-moon md:text-3xl">
                    Your Total: <span className="text-copper font-display text-4xl">R {cartTotal}.00</span>
                  </p>
                  <button
                    type="button"
                    onClick={proceedWithOrder}
                    className="bg-leather rounded px-8 py-4 font-body text-md tracking-widest text-moon uppercase transition hover:bg-copper"
                  >
                    Proceed With Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
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
