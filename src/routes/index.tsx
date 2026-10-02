import { createFileRoute, Link } from "@tanstack/react-router";
import { FiltroTempo } from "../components/FiltroTempo";
import { Assistente } from "../components/Assistente";
import { Terra3D } from "../components/Terra3D";

import dinossauros from "../assets/dinossauros.jpg";
import egito from "../assets/egito.jpg";
import castelo from "../assets/castelo.jpg";
import florenca from "../assets/florenca.jpg";
import litoral2050 from "../assets/litoral2050.jpg";
import ano3000 from "../assets/ano3000.jpg";
import novaAurora from "../assets/nova-aurora.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verso · Agência de Viagem Temporal" },
      {
        name: "description",
        content:
          "Viaje além do tempo: expedições curadas para o Egito Antigo, a era dos dinossauros e o ano 3000, com passaportes temporais autenticados.",
      },
      { property: "og:title", content: "Verso · Agência de Viagem Temporal" },
      {
        property: "og:description",
        content:
          "Do vale do Nilo ao horizonte do ano 3000 — embarque em rotas temporais curadas por nossos crononautas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const eras = [
  { nome: "Pré-Histórico", periodo: "−65M · 03 rotas", destaque: false },
  { nome: "Antiguidade", periodo: "3000 a.C. · 02 rotas", destaque: false },
  { nome: "Idade Média", periodo: "1100 d.C. · 02 rotas", destaque: false },
  { nome: "Renascença", periodo: "1500 d.C. · 01 rota", destaque: false },
  { nome: "Contemporâneo", periodo: "2050 d.C. · 01 rota", destaque: false },
  { nome: "Ano 3000", periodo: "3000 d.C. · 01 rota", destaque: true },
];

const expedicoes = [
  {
    imagem: dinossauros,
    alt: "Selva pré-histórica ao amanhecer com a silhueta de um tiranossauro",
    era: "Pré-Histórico",
    eraClasses: "bg-mint/15 text-mint",
    data: "−65M a.C.",
    dataClasses: "text-muted",
    titulo: "Vale dos Dinossauros",
    descricao: "Safari de observação em solo mesozoico.",
    duracao: "07 dias",
    duracaoClasses: "text-muted",
    preco: "4.200 TC",
    precoClasses: "text-gold",
    destaque: false,
  },
  {
    imagem: egito,
    alt: "Pôr do sol sobre o rio Nilo com barcos a vela e pirâmides ao fundo",
    era: "Antiguidade",
    eraClasses: "bg-gold/15 text-gold",
    data: "2500 a.C.",
    dataClasses: "text-muted",
    titulo: "Egito Antigo",
    descricao: "Maresia do Nilo e templos ao entardecer.",
    duracao: "05 dias",
    duracaoClasses: "text-muted",
    preco: "3.600 TC",
    precoClasses: "text-gold",
    destaque: false,
  },
  {
    imagem: castelo,
    alt: "Castelo medieval ao entardecer com janelas iluminadas por tochas",
    era: "Idade Média",
    eraClasses: "bg-amber/15 text-amber",
    data: "1100 d.C.",
    dataClasses: "text-muted",
    titulo: "Castelo de Alvorada",
    descricao: "Banquete à luz de tochas no interior.",
    duracao: "04 dias",
    duracaoClasses: "text-muted",
    preco: "2.800 TC",
    precoClasses: "text-gold",
    destaque: false,
  },
  {
    imagem: florenca,
    alt: "Ateliê de pintura renascentista em Florença à luz de velas",
    era: "Renascença",
    eraClasses: "bg-amber/15 text-amber",
    data: "1500 d.C.",
    dataClasses: "text-muted",
    titulo: "Florença em Splendor",
    descricao: "Ateliês, ópera e ruas douradas.",
    duracao: "06 dias",
    duracaoClasses: "text-muted",
    preco: "5.100 TC",
    precoClasses: "text-gold",
    destaque: false,
  },
  {
    imagem: litoral2050,
    alt: "Cidade costeira do futuro com torres de vidro à beira-mar",
    era: "Contemporâneo",
    eraClasses: "bg-cyan/15 text-cyan",
    data: "2050 d.C.",
    dataClasses: "text-muted",
    titulo: "Litoral 2050",
    descricao: "Arquitetura viva e mar limpo.",
    duracao: "03 dias",
    duracaoClasses: "text-muted",
    preco: "2.200 TC",
    precoClasses: "text-gold",
    destaque: false,
  },
  {
    imagem: ano3000,
    alt: "Horizonte do ano 3000 com torres ciano brilhantes sob um céu de nebulosa",
    era: "Ano 3000",
    eraClasses: "bg-cyan/20 text-cyan",
    data: "3000 d.C.",
    dataClasses: "text-cyan/70",
    titulo: "Nova Aurora",
    descricao: "Órbita baixa e luzes que respiram.",
    duracao: "10 dias",
    duracaoClasses: "text-cyan/70",
    preco: "8.900 TC",
    precoClasses: "text-cyan",
    destaque: true,
  },
];

const barrasCodigo = ["w-1.5", "w-1", "w-2", "w-1", "w-1.5", "w-1", "w-1", "w-2.5", "w-1", "w-1.5", "w-1", "w-2"];

function Index() {
  return (
    <div className="min-h-screen bg-ink font-sans text-white antialiased selection:bg-cyan/30">
      {/* Nav + linha do tempo persistente */}
      <header className="sticky top-0 z-30 border-b border-line/60 bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-cyan to-amber text-ink">
              <span className="font-display text-lg font-semibold">V</span>
            </span>
            <span className="text-sm font-semibold tracking-wide">Verso</span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted sm:inline">
              · Agência de Viagem Temporal
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#eras" className="transition-colors hover:text-white">Eras</a>
            <a href="#catalog" className="transition-colors hover:text-white">Expedições</a>
            <a href="#detail" className="transition-colors hover:text-white">Passaporte</a>
            <a href="#safety" className="transition-colors hover:text-white">Segurança</a>
          </nav>
          <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted transition-colors hover:text-white">Entrar</Link>
          <a
            href="#detail"
            className="rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-ink ring-1 ring-cyan/60"
          >
            Reservar agora
          </a>
          </div>
        </div>
        <div className="border-t border-line/50 bg-panel/60">
          <FiltroTempo />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="pointer-events-none absolute -top-10 right-10 h-[380px] w-[380px] rounded-full bg-amber/10 blur-[110px]" />
        {/* Terra 3D interativa atrás do texto */}
        <div className="absolute inset-y-0 right-0 w-full cursor-grab active:cursor-grabbing lg:w-[58%]" title="Arraste para girar a Terra">
          <Terra3D />
        </div>
        <div className="pointer-events-none relative mx-auto max-w-6xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="size-1.5 rounded-full bg-cyan" /> Temporada 2024 · 09 rotas ativas
          </p>
          <h1 className="max-w-[24ch] font-display text-6xl font-medium leading-[0.95] text-balance sm:text-7xl lg:text-8xl">
            <span className="block bg-gradient-to-br from-cyan via-amber to-rose bg-clip-text text-transparent">
              Viaje além do tempo
            </span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-pretty text-base text-muted lg:text-lg">
            Do vale do Nilo ao horizonte do ano 3000 — embarque em rotas curadas por nossos
            crononautas em passaportes temporais autenticados.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#catalog"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-cyan py-3 pr-5 pl-4 text-sm font-semibold text-ink ring-1 ring-cyan/60"
            >
              Explorar expedições <span aria-hidden="true">→</span>
            </a>
            <a
              href="#detail"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-white transition-colors hover:border-cyan/60"
            >
              Ver passaporte
            </a>
          </div>
        </div>

        {/* Faixa de eras */}
        <div id="eras" className="relative mx-auto max-w-6xl px-6 pb-4 lg:px-8">
          <div className="rounded-2xl border border-line bg-panel/70 p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted">Escolha uma era</span>
              <svg className="h-6 w-40 text-line" viewBox="0 0 160 24" fill="none" aria-hidden="true">
                <line x1="0" y1="12" x2="160" y2="12" stroke="currentColor" strokeWidth="2" className="flow" />
                <circle cx="160" cy="12" r="3.5" fill="#4cc9f0" />
              </svg>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {eras.map((era) => (
                <div
                  key={era.nome}
                  className={`shrink-0 rounded-xl border px-5 py-3 ${
                    era.destaque ? "border-cyan/50 bg-cyan/10" : "border-line bg-panel2"
                  }`}
                >
                  <div className={`text-base font-semibold ${era.destaque ? "text-cyan" : ""}`}>
                    {era.nome}
                  </div>
                  <div className={`text-xs ${era.destaque ? "text-cyan/70" : "text-muted"}`}>
                    {era.periodo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalog" className="border-t border-line/50">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="max-w-[40ch] font-display text-3xl font-medium text-balance lg:text-4xl">
              Expedições por era
            </h2>
            <span className="hidden text-sm text-muted sm:block">06 rotas · 6 eras</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {expedicoes.map((exp) => (
              <article
                key={exp.titulo}
                className={`group rounded-2xl border bg-panel p-3 transition-transform duration-300 hover:-translate-y-1 ${
                  exp.destaque ? "border-cyan/40 ring-1 ring-cyan/20" : "border-line ring-1 ring-black/5"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-panel2 outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={exp.imagem}
                    alt={exp.alt}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-2 pt-4 pb-2">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${exp.eraClasses}`}>
                      {exp.era}
                    </span>
                    <span className={`text-[11px] ${exp.dataClasses}`}>{exp.data}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-medium">{exp.titulo}</h3>
                  <p className="mt-1 text-sm text-muted">{exp.descricao}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3">
                    <span className={`text-xs ${exp.duracaoClasses}`}>{exp.duracao}</span>
                    <span className={`text-sm font-semibold ${exp.precoClasses}`}>{exp.preco}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Passaporte temporal */}
      <section id="detail" className="border-t border-line/50 bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-cyan">
            Passaporte temporal · VRS-0300
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-panel2 outline-1 -outline-offset-1 outline-black/5">
              <img
                src={novaAurora}
                alt="Cidade futurista de Nova Aurora à noite, com luzes ciano e âmbar"
                loading="lazy"
                width={1280}
                height={832}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-panel2 p-6 ring-1 ring-black/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Embarque</p>
                  <p className="mt-1 font-display text-2xl font-medium">Nova Aurora</p>
                  <p className="text-sm text-muted">Ano 3000 · Órbita baixa</p>
                </div>
                <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-cyan">
                  Confirmado
                </span>
              </div>
              <div className="my-5 border-t border-dashed border-line" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Passageiro</p>
                  <p className="mt-1 font-medium">Você</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Duração</p>
                  <p className="mt-1 font-medium">10 dias</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Porta</p>
                  <p className="mt-1 font-medium">T-07</p>
                </div>
              </div>
              <div className="my-5 border-t border-dashed border-line" />
              <div className="flex items-end justify-between">
                <div className="flex gap-3" aria-hidden="true">
                  {barrasCodigo.map((largura, i) => (
                    <div key={i} className={`h-12 bg-white/70 ${largura}`} />
                  ))}
                </div>
                <p className="text-[10px] text-muted">VRS-0300 · OZ-2024</p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm text-muted">
                  Total <span className="ml-1 text-2xl font-semibold text-cyan">8.900 TC</span>
                </p>
                <button className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink ring-1 ring-cyan/60">
                  Reservar viagem
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segurança / paradoxo */}
      <section id="safety" className="border-t border-line/50">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-amber">
                Aviso de paradoxo
              </p>
              <h2 className="max-w-[30ch] font-display text-3xl font-medium text-balance lg:text-4xl">
                Traveje o fluxo com cuidado
              </h2>
              <p className="mt-4 max-w-[46ch] text-pretty text-base text-muted">
                Toda rota é monitorada pela nossa sala de anti-paradoxo. Alterações no passado são
                revertidas em até 90 segundos. O cheiro de ozônio no embarque é normal e inofensivo.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-panel p-5 ring-1 ring-black/5">
                <span className="font-display text-3xl font-medium text-amber">8%</span>
                <p className="mt-2 text-sm text-muted">Taxa de desvio corrigida automaticamente.</p>
              </div>
              <div className="rounded-xl border border-line bg-panel p-5 ring-1 ring-black/5">
                <span className="font-display text-3xl font-medium text-cyan">90s</span>
                <p className="mt-2 text-sm text-muted">Janela média de reversão temporal.</p>
              </div>
              <div className="rounded-xl border border-line bg-panel p-5 ring-1 ring-black/5">
                <span className="font-display text-3xl font-medium text-mint">24/7</span>
                <p className="mt-2 text-sm text-muted">Equipe de estabilização em prontidão.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-gradient-to-br from-cyan to-amber text-ink">
              <span className="font-display text-sm font-semibold">V</span>
            </span>
            Verso · Agência de Viagem Temporal
          </p>
          <p>Demonstração estática · conteúdo fictício · sem pagamentos reais</p>
        </div>
      </footer>
      <Assistente />
    </div>
  );
}
