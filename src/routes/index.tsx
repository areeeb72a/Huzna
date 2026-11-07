import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import lake from "@/assets/lake.jpg";
import fort from "@/assets/fort.jpg";
import passu from "@/assets/passu.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hunza — Journeys to the Roof of the World" },
      { name: "description", content: "Curated luxury journeys through Hunza Valley, Attabad Lake, Passu Cones and Baltit Fort." },
      { property: "og:title", content: "Hunza — Journeys to the Roof of the World" },
      { property: "og:description", content: "Curated luxury journeys through the Karakoram." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const places = [
  { img: lake, n: "01", t: "Attabad Lake", d: "A turquoise mirror born from a mountain's fall.", alt: "2,559m" },
  { img: passu, n: "02", t: "Passu Cones", d: "Cathedral spires of granite along the Karakoram Highway.", alt: "6,106m" },
  { img: fort, n: "03", t: "Baltit Fort", d: "Seven centuries of royal stone beneath the Milky Way.", alt: "700 yrs" },
];

const packages = [
  { t: "The Wanderer", days: "5 Days", p: "PKR 89,000", f: ["Karimabad stay", "Attabad boat ride", "Local guide"] },
  { t: "The Explorer", days: "8 Days", p: "PKR 149,000", f: ["Khunjerab Pass", "Passu glacier trek", "Luxury lodges", "All meals"], hot: true },
  { t: "The Royal", days: "12 Days", p: "PKR 289,000", f: ["Private 4x4 + chauffeur", "Fort night dinner", "Helicopter view", "Photographer"] },
];

function useCount(target: number, on: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    let f = 0;
    const id = setInterval(() => { f++; setV(Math.round((target * f) / 60)); if (f >= 60) clearInterval(id); }, 25);
    return () => clearInterval(id);
  }, [on, target]);
  return v;
}

function Stat({ n, s, l, on }: { n: number; s: string; l: string; on: boolean }) {
  const v = useCount(n, on);
  return (
    <div className="text-center">
      <div className="font-display text-6xl text-gold">{v.toLocaleString()}{s}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
    </div>
  );
}

function Index() {
  const [y, setY] = useState(0);
  const [statsOn, setStatsOn] = useState(false);
  const [mx, setMx] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onS = () => setY(window.scrollY);
    window.addEventListener("scroll", onS, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); if (e.target.id === "stats") setStatsOn(true); }
    }), { threshold: 0.2 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onS); io.disconnect(); };
  }, []);

  return (
    <div className="grain overflow-x-hidden bg-background text-foreground">
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-gold" style={{ width: `${typeof document !== "undefined" ? (y / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100 : 0}%` }} />
      <nav className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-5 transition-all ${y > 50 ? "bg-background/80 backdrop-blur-md" : ""}`}>
        <span className="font-display text-2xl tracking-[0.3em]">HUNZA</span>
        <div className="hidden gap-10 text-xs uppercase tracking-[0.3em] md:flex">
          <a href="#places" className="hover:text-gold">Places</a>
          <a href="#journeys" className="hover:text-gold">Journeys</a>
          <a href="#book" className="hover:text-gold">Book</a>
        </div>
      </nav>

      <section
        className="relative flex h-screen items-center justify-center overflow-hidden"
        onMouseMove={(e) => setMx({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
      >
        <img src={hero} alt="Hunza valley at golden hour" width={1920} height={1088}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ transform: `translate(${mx.x * -20}px, ${y * 0.4 + mx.y * -20}px) scale(${1.1 + y * 0.0003})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="relative px-6 text-center" style={{ opacity: 1 - y / 600 }}>
          <p className="rise text-xs uppercase tracking-[0.5em] text-gold">Gilgit-Baltistan · Pakistan</p>
          <h1 className="rise mt-6 font-display text-7xl leading-none md:text-[10rem]" style={{ animationDelay: ".2s" }}>
            Roof of the <em className="text-shimmer">World</em>
          </h1>
          <p className="rise mx-auto mt-8 max-w-lg text-muted-foreground" style={{ animationDelay: ".4s" }}>
            Where apricot blossoms meet 7,000-metre peaks. Handcrafted journeys through the Karakoram.
          </p>
          <a href="#book" className="rise mt-10 inline-block border border-gold px-10 py-4 text-xs uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-primary-foreground" style={{ animationDelay: ".6s" }}>
            Begin the Journey
          </a>
        </div>
        <div className="absolute bottom-8 left-1/2 h-14 w-px -translate-x-1/2 animate-pulse bg-gold" />
      </section>

      <div className="overflow-hidden border-y border-border py-6">
        <div className="marquee flex w-max gap-16 whitespace-nowrap font-display text-4xl italic text-muted-foreground">
          {Array(2).fill(["Rakaposhi", "✦", "Khunjerab", "✦", "Eagle's Nest", "✦", "Hussaini Bridge", "✦", "Borith Lake", "✦", "Altit Fort", "✦"]).flat().map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>

      <section id="stats" className="reveal grid gap-12 px-8 py-28 md:grid-cols-4">
        <Stat n={7788} s="m" l="Rakaposhi Peak" on={statsOn} />
        <Stat n={4693} s="m" l="Khunjerab Pass" on={statsOn} />
        <Stat n={700} s="+" l="Years of Heritage" on={statsOn} />
        <Stat n={12} s="k" l="Happy Travellers" on={statsOn} />
      </section>

      <section id="places" className="px-8 pb-28">
        <div className="reveal mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-gold">The Wonders</p>
          <h2 className="mt-4 font-display text-6xl">Three places. <em>One soul.</em></h2>
        </div>
        <div className="mx-auto max-w-6xl space-y-32">
          {places.map((p, i) => (
            <div key={p.t} className={`reveal flex flex-col items-center gap-12 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="group relative w-full overflow-hidden md:w-1/2">
                <img src={p.img} alt={p.t} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover transition duration-[1.5s] group-hover:scale-110" />
                <span className="absolute right-4 top-4 bg-background/70 px-3 py-1 text-xs tracking-widest text-gold backdrop-blur">{p.alt}</span>
              </div>
              <div className="md:w-1/2">
                <span className="font-display text-8xl text-gold/30">{p.n}</span>
                <h3 className="font-display text-5xl">{p.t}</h3>
                <p className="mt-6 max-w-sm text-lg text-muted-foreground">{p.d}</p>
                <div className="mt-8 h-px w-24 bg-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="journeys" className="bg-card px-8 py-28">
        <div className="reveal mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-gold">Journeys</p>
          <h2 className="mt-4 font-display text-6xl">Choose your <em>ascent</em></h2>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {packages.map((k) => (
            <div key={k.t} className={`reveal border p-10 transition duration-500 hover:-translate-y-3 ${k.hot ? "border-gold bg-secondary" : "border-border"}`}>
              {k.hot && <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Most Loved</span>}
              <h3 className="mt-2 font-display text-4xl">{k.t}</h3>
              <p className="text-sm text-muted-foreground">{k.days}</p>
              <p className="mt-6 font-display text-3xl text-gold">{k.p}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {k.f.map((f) => <li key={f} className="flex gap-3"><span className="text-gold">✦</span>{f}</li>)}
              </ul>
              <a href="#book" className="mt-10 block border border-gold py-3 text-center text-xs uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-primary-foreground">Reserve</a>
            </div>
          ))}
        </div>
      </section>

      <Book />

      <footer className="border-t border-border px-8 py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        © 2026 Hunza Journeys · Crafted by Syed Ahmed
      </footer>
    </div>
  );
}

function Book() {
  const [done, setDone] = useState(false);
  return (
    <section id="book" className="relative overflow-hidden px-8 py-32">
      <img src={fort} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="reveal relative mx-auto max-w-xl text-center">
        <h2 className="font-display text-6xl">The mountains <em className="text-shimmer">are calling</em></h2>
        {done ? (
          <p className="mt-10 text-lg text-gold">Shukriya! We'll contact you within 24 hours. ✦</p>
        ) : (
          <form className="mt-10 space-y-4" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <input required placeholder="Your name" className="w-full border-b border-input bg-transparent py-3 outline-none focus:border-gold" />
            <input required type="email" placeholder="Email" className="w-full border-b border-input bg-transparent py-3 outline-none focus:border-gold" />
            <input type="date" className="w-full border-b border-input bg-transparent py-3 outline-none focus:border-gold" />
            <button className="mt-6 w-full bg-gold py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition hover:opacity-90">Request Booking</button>
          </form>
        )}
      </div>
    </section>
  );
}
