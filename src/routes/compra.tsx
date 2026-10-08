import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { calcularPreco, formatarAno, ANO_ATUAL } from "../components/FiltroTempo";
import { useUsuario, sair, registrarCompra } from "../lib/contas";

const busca = z.object({
  ano: fallback(z.number(), ANO_ATUAL - 2).default(ANO_ATUAL - 2),
  destino: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/compra")({
  validateSearch: zodValidator(busca),
  head: () => ({
    meta: [
      { title: "Comprar passagem · ChronoTripBrazil" },
      { name: "description", content: "Escolha o ano, o número de passageiros e compre sua passagem temporal." },
      { property: "og:title", content: "Comprar passagem · ChronoTripBrazil" },
      { property: "og:description", content: "Finalize sua viagem no tempo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Compra,
});

function Compra() {
  const { ano: anoInicial, destino } = Route.useSearch();
  const { usuario } = useUsuario();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [ano, setAno] = useState(Math.round(anoInicial));
  const [passageiros, setPassageiros] = useState(1);
  const [classe, setClasse] = useState<"eco" | "premium">("eco");
  const [codigo, setCodigo] = useState<string | null>(null);

  const unitario = calcularPreco(ano) * (classe === "premium" ? 1.6 : 1);
  const total = Math.round(unitario * passageiros);

  return (
    <div className="min-h-screen bg-ink px-6 py-10 font-sans text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-sm text-muted hover:text-white">← Voltar</Link>
          {usuario && (
            <span className="text-sm text-muted">
              Olá, <span className="text-white">{usuario.nome}</span> ·{" "}
              <button onClick={sair} className="text-cyan">sair</button>
            </span>
          )}
        </div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-cyan">Compra de passagem</p>
        <h1 className="mt-2 font-display text-4xl font-medium">{destino || "Viagem personalizada"}</h1>

        {codigo ? (
          <div className="mt-8 rounded-2xl border border-cyan/40 bg-panel p-8 text-center">
            <p className="text-5xl">🎫</p>
            <h2 className="mt-4 font-display text-3xl">Passagem confirmada!</h2>
            <p className="mt-2 text-muted">Destino: {formatarAno(ano)} · {passageiros} passageiro(s)</p>
            <p className="mt-4 text-2xl font-semibold text-cyan">{codigo}</p>
            <p className="mt-1 text-sm text-muted">Total pago: {total.toLocaleString("pt-BR")} TC</p>
            <Link to="/" className="mt-6 inline-block rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink">Voltar ao início</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 rounded-2xl border border-line bg-panel p-6">
            <label className="block text-sm">
              <span className="text-muted">Ano de destino (negativo = antes de Cristo)</span>
              <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-cyan" />
              <span className="mt-1 block text-xs text-muted">{formatarAno(ano)}</span>
            </label>
            <label className="block text-sm">
              <span className="text-muted">Passageiros</span>
              <input type="number" min={1} max={10} value={passageiros}
                onChange={(e) => setPassageiros(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="mt-1 w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-cyan" />
            </label>
            <div className="text-sm">
              <span className="text-muted">Classe</span>
              <div className="mt-2 flex gap-3">
                {(["eco", "premium"] as const).map((c) => (
                  <button key={c} onClick={() => setClasse(c)}
                    className={`flex-1 rounded-xl border px-4 py-3 ${classe === c ? "border-cyan bg-cyan/10 text-cyan" : "border-line"}`}>
                    {c === "eco" ? "Econômica" : "Premium (+60%)"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-line pt-5">
              <p className="text-sm text-muted">Total <span className="ml-1 text-3xl font-semibold text-cyan">{total.toLocaleString("pt-BR")} TC</span></p>
              {usuario ? (
                <div className="text-right">
                  <button
                    disabled={enviando}
                    onClick={async () => {
                      setEnviando(true); setErro("");
                      const r = await registrarCompra({ destino: destino || "Viagem personalizada", ano, passageiros, classe, total });
                      setEnviando(false);
                      if (r.codigo) setCodigo(r.codigo); else setErro(r.erro ?? "Erro");
                    }}
                    className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60">
                    {enviando ? "Processando..." : "Confirmar compra"}
                  </button>
                  {erro && <p className="mt-2 text-xs text-rose">{erro}</p>}
                </div>
              ) : (
                <Link to="/login" className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink">
                  Entre para comprar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
