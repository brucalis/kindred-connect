import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Shuffle, Sparkles, Wine, Users, Flame, ChevronRight, X } from "lucide-react";
import { games } from "@/data/games";

export const Route = createFileRoute("/")({ component: Index });

const categories = ["Todos", "Fiesta", "Preguntas", "Cartas y dados", "Movimiento", "Música"];

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<(typeof games)[number] | null>(games[0]);

  const filtered = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = category === "Todos" || game.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || game.title.toLowerCase().includes(q) || game.text.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const surpriseMe = () => {
    const pool = filtered.length ? filtered : games;
    setSelected(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <main className="min-h-screen bg-[#0c0710] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700;800&display=swap');
        :root { font-family: 'Montserrat', sans-serif; }
        .display { font-family: 'Anton', sans-serif; letter-spacing: .02em; }
        .noise { background-image: radial-gradient(circle at 20% 10%, rgba(255,70,70,.14), transparent 24%), radial-gradient(circle at 80% 0%, rgba(255,196,0,.08), transparent 24%), linear-gradient(180deg,#150812 0%,#0b0710 54%,#08070a 100%); }
        .glass { background: linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035)); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,.11); }
      `}</style>

      <section className="noise relative overflow-hidden border-b border-white/10">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#d92332]/20 blur-3xl" />
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#ff7a00]/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-8 lg:px-10 lg:pb-16">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#d92332] shadow-[0_0_40px_rgba(217,35,50,.35)]"><Wine size={22}/></div>
              <div><p className="display text-2xl leading-none">50 DRINKING GAMES</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.24em] text-white/45">Edición Fiesta · Español LATAM</p></div>
            </div>
            <button onClick={surpriseMe} className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold transition hover:bg-white/10 sm:flex"><Shuffle size={16}/> Juego al azar</button>
          </header>

          <div className="grid items-end gap-10 pt-14 lg:grid-cols-[1.1fr_.9fr] lg:pt-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffbd59]/25 bg-[#ffbd59]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[.18em] text-[#ffd083]"><Sparkles size={14}/> Tu fiesta empieza aquí</div>
              <h1 className="display max-w-3xl text-6xl leading-[.9] sm:text-7xl lg:text-[92px]">50 JUEGOS.<br/><span className="text-[#e52b3a]">CERO ABURRIMIENTO.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Elige un juego, reúne a tu grupo y empieza. Preguntas, retos, cartas, movimiento y dinámicas para darle otra energía a cualquier encuentro.</p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-white/75"><span className="rounded-full bg-white/7 px-4 py-2">🥂 Fiesta</span><span className="rounded-full bg-white/7 px-4 py-2">💬 Preguntas</span><span className="rounded-full bg-white/7 px-4 py-2">🃏 Cartas y dados</span><span className="rounded-full bg-white/7 px-4 py-2">🏃 Retos</span></div>
            </div>

            <div className="glass relative overflow-hidden rounded-[32px] p-6 shadow-2xl sm:p-8">
              <div className="absolute right-4 top-4 rounded-full bg-[#d92332] px-3 py-1 text-[10px] font-black uppercase tracking-widest">Destacado</div>
              <div className="text-5xl">{selected?.emoji}</div>
              <p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#ffbd59]">Juego #{String(selected?.id).padStart(2,"0")}</p>
              <h2 className="display mt-2 text-4xl sm:text-5xl">{selected?.title}</h2>
              <p className="mt-5 line-clamp-5 text-sm leading-7 text-white/68">{selected?.text}</p>
              <button onClick={() => selected && setSelected(selected)} className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e52b3a] px-5 py-4 text-sm font-black uppercase tracking-wider shadow-[0_12px_30px_rgba(229,43,58,.25)] transition hover:translate-y-[-2px] hover:bg-[#f13a49]">Ver cómo se juega <ChevronRight size={18}/></button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={19}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar un juego..." className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 outline-none placeholder:text-white/30 focus:border-[#e52b3a]/70"/></div>
          <button onClick={surpriseMe} className="flex items-center justify-center gap-2 rounded-2xl bg-[#ffbd59] px-6 py-4 font-black text-[#25130c] transition hover:scale-[1.02]"><Shuffle size={18}/> Sorpréndeme</button>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c)=><button key={c} onClick={()=>setCategory(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold transition ${category===c?"bg-[#e52b3a] text-white":"bg-white/6 text-white/55 hover:bg-white/10"}`}>{c}</button>)}
        </div>

        <div className="mt-8 flex items-center justify-between"><div><p className="text-sm font-bold text-white/40">Colección completa</p><h3 className="display mt-1 text-4xl">ELIGE TU JUEGO</h3></div><p className="rounded-full bg-white/6 px-4 py-2 text-sm font-bold text-white/45">{filtered.length} juegos</p></div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((game)=><button key={game.id} onClick={()=>setSelected(game)} className="group glass min-h-[220px] rounded-[26px] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#e52b3a]/55 hover:bg-white/[.075]">
            <div className="flex items-start justify-between"><span className="text-4xl transition group-hover:scale-110">{game.emoji}</span><span className="rounded-full bg-white/7 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white/38">#{String(game.id).padStart(2,"0")}</span></div>
            <p className="mt-7 text-[10px] font-black uppercase tracking-[.2em] text-[#ffbd59]">{game.category}</p>
            <h4 className="display mt-2 text-2xl leading-tight">{game.title}</h4>
            <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/42">{game.text}</p>
          </button>)}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#120b11]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-10">
          <Feature icon={<Users/>} title="Hecho para grupos" text="Perfecto para reuniones, previas, cumpleaños y noches con amigos."/>
          <Feature icon={<Flame/>} title="50 dinámicas distintas" text="Cambia de estilo cuando quieras: preguntas, memoria, cartas, música o movimiento."/>
          <Feature icon={<Wine/>} title="Solo para adultos" text="Contenido pensado para mayores de edad. Jueguen con responsabilidad."/>
        </div>
      </section>

      {selected && <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6" onClick={()=>setSelected(null)}>
        <div onClick={(e)=>e.stopPropagation()} className="max-h-[88vh] w-full overflow-y-auto rounded-t-[32px] border border-white/10 bg-[#171017] p-6 shadow-2xl sm:max-w-2xl sm:rounded-[32px] sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><div className="text-5xl">{selected.emoji}</div><p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#ffbd59]">{selected.category} · Juego #{String(selected.id).padStart(2,"0")}</p><h2 className="display mt-2 text-4xl sm:text-5xl">{selected.title}</h2></div><button onClick={()=>setSelected(null)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/7 text-white/60 hover:bg-white/12"><X size={19}/></button></div>
          <div className="mt-7 rounded-3xl bg-white/[.055] p-5 sm:p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Cómo se juega</p><p className="mt-4 text-[15px] leading-8 text-white/76">{selected.text}</p></div>
          <div className="mt-6 rounded-2xl border border-[#ffbd59]/15 bg-[#ffbd59]/7 p-4 text-xs leading-5 text-[#ffd999]/75">🔞 Solo para mayores de edad. Si deciden beber, háganlo con moderación. Nadie debe sentirse obligado a consumir alcohol para participar.</div>
          <button onClick={()=>{const pool=games.filter(g=>g.id!==selected.id);setSelected(pool[Math.floor(Math.random()*pool.length)])}} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e52b3a] px-5 py-4 font-black"><Shuffle size={18}/> Elegir otro juego</button>
        </div>
      </div>}
    </main>
  );
}

function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){
  return <div className="flex gap-4 rounded-2xl bg-white/[.035] p-5"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e52b3a]/15 text-[#f0525f]">{icon}</div><div><h4 className="font-extrabold">{title}</h4><p className="mt-1 text-sm leading-6 text-white/45">{text}</p></div></div>
}