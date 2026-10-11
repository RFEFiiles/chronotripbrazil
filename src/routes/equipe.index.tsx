import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useUsuario, ehFuncionario, listarTodasCompras, cancelarCompra, sair, type CompraEquipe } from "../lib/contas";
import { formatarAno } from "../components/FiltroTempo";

export const Route = createFileRoute("/equipe/")({
  head: () => ({
    meta: [
      { title: "Painel da equipe · ChronoTripBrazil" },
      { name: "description", content: "Perfil e painel de controle dos funcionários da ChronoTripBrazil." },
      { property: "og:title", content: "Painel da equipe · ChronoTripBrazil" },
      { property: "og:description", content: "Vendas, clientes e viagens da agência." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PainelEquipe,
});

function PainelEquipe() {
  const navigate = useNavigate();
  const { usuario, carregando } = useUsuario();
  const [autorizado, setAutorizado] = useState<boolean | null>(null);
  const [compras, setCompras] = useState<CompraEquipe[]>([]);
  const [nomes, setNomes] = useState<Record<string, string>>({});
  const [busca, setBusca] = useState("");

  const recarregar = () => listarTodasCompras().then((r) => { setCompras(r.compras); setNomes(r.nomes); });

  useEffect(() => {
    if (carregando) return;
    if (!usuario) { setAutorizado(false); return; }
    ehFuncionario().then((ok) => { setAutorizado(ok); if (ok) recarregar(); });
  }, [carregando, usuario?.id]);

  if (autorizado === null) return <main className="min-h-screen bg-ink" />;
  if (!autorizado) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink p-6 text-center text-white">
        <p className="text-muted">Área exclusiva para funcionários.</p>
        <Link to="/equipe/login" className="rounded-full bg-amber px-6 py-3 font-semibold text-ink">Entrar como funcionário</Link>
      </main>
    );
  }

  const faturamento = compras.reduce((s, c) => s + c.total, 0);
  const passageiros = compras.reduce((s, c) => s + c.passageiros, 0);
  const clientes = new Set(compras.map((c) => c.user_id)).size;
  const filtradas = compras.filter((c) =>
    `${c.codigo} ${c.destino} ${nomes[c.user_id] ?? ""}`.toLowerCase().includes(busca.toLowerCase()),
  );

  const cancelar = async (c: CompraEquipe) => {
    if (!confirm(`Cancelar a passagem ${c.codigo}?`)) return;
    const falha = await cancelarCompra(c.id);
    if (falha) alert(falha); else recarregar();
  };

  const sairEquipe = async () => { await sair(); navigate({ to: "/equipe/login", replace: true }); };

  return (
    <main className="min-h-screen bg-ink px-4 py-6 sm:px-6 sm:py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-white">Ir ao site</Link>
          <button onClick={sairEquipe} className="text-sm text-muted hover:text-rose">Sair</button>
        </div>

        <section className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5 rounded-2xl border border-amber/40 bg-panel p-4 sm:p-6">
          <div className="flex h-16 w-16 shrink-0 sm:h-20 sm:w-20 items-center justify-center overflow-hidden rounded-full border border-amber bg-panel2 text-3xl text-amber">
            {usuario?.foto ? <img src={usuario.foto} alt="Foto" className="h-full w-full object-cover" /> : usuario?.nome.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">FUNCIONÁRIO</span>
            <h1 className="mt-2 break-words font-display text-2xl sm:text-3xl">{usuario?.nome}</h1>
            <p className="break-all text-sm text-muted">{usuario?.email}</p>
          </div>
          <Link to="/perfil" className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-full border border-amber px-4 py-2 sm:col-span-1 text-sm text-amber hover:bg-amber hover:text-ink">Editar perfil</Link>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["Passagens vendidas", compras.length],
            ["Faturamento", `${faturamento.toLocaleString("pt-BR")} TC`],
            ["Passageiros", passageiros],
            ["Clientes", clientes],
          ].map(([t, v]) => (
            <div key={t} className="rounded-2xl border border-line min-w-0 bg-panel p-4 sm:p-5">
              <p className="text-xs text-muted">{t}</p>
              <p className="mt-2 break-words font-display text-xl text-cyan sm:text-2xl">{v}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <h2 className="font-display text-2xl">Todas as vendas</h2>
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar código, destino ou cliente" aria-label="Buscar vendas" className="min-h-11 w-full min-w-0 rounded-xl sm:w-72 border border-line bg-panel px-4 py-2 text-sm outline-none focus:border-amber" />
        </div>
        {filtradas.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nenhuma venda encontrada.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {filtradas.map((c) => (
              <li key={c.id} className="grid min-w-0 gap-3 rounded-xl sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center border border-line bg-panel p-4 text-sm">
                <div>
                  <p className="break-words font-semibold">{c.destino || "Viagem livre"} <span className="text-cyan">· {c.codigo}</span></p>
                  <p className="text-muted">
                    {nomes[c.user_id] ?? "Cliente"} · {formatarAno(c.ano)} · {c.passageiros} passageiro(s) · {c.classe === "premium" ? "Premium" : "Econômica"} · {new Date(c.criado_em).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-4">
                  <p className="text-amber">{c.total.toLocaleString("pt-BR")} TC</p>
                  <button onClick={() => cancelar(c)} className="rounded-full border min-h-11 border-rose/50 px-3 py-2 text-xs text-rose hover:bg-rose hover:text-ink">Cancelar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
