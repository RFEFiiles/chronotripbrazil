import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CONTAS, entrar } from "../lib/contas";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar · ChronoTripBrazil Agência de Viagem Temporal" },
      { name: "description", content: "Acesse sua conta ChronoTripBrazil para ver seus passaportes temporais." },
      { property: "og:title", content: "Entrar · ChronoTripBrazil" },
      { property: "og:description", content: "Acesse sua conta de crononauta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-6 py-10 font-sans text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative w-full max-w-sm rounded-2xl border border-line bg-panel p-8">
        <Link to="/" className="mb-6 flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-cyan to-amber font-display text-lg font-semibold text-ink">C</span>
          <span className="text-sm font-semibold">ChronoTripBrazil</span>
        </Link>
        <h1 className="font-display text-3xl font-medium">Bem-vindo, crononauta</h1>
        <p className="mt-2 text-sm text-muted">Entre para comprar suas passagens no tempo.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (entrar(email, senha)) navigate({ to: "/" });
            else setErro("E-mail ou senha incorretos.");
          }}
          className="mt-6 space-y-4"
        >
          <label className="block text-sm">
            <span className="text-muted">E-mail</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-cyan" />
          </label>
          <label className="block text-sm">
            <span className="text-muted">Senha</span>
            <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-cyan" />
          </label>
          <button className="w-full rounded-full bg-cyan py-3 text-sm font-semibold text-ink">Entrar</button>
        </form>
        {erro && <p className="mt-4 rounded-xl bg-rose/15 px-3 py-2 text-sm text-rose">{erro}</p>}
        <div className="mt-6 rounded-xl border border-line bg-ink/60 p-3 text-xs text-muted">
          <p className="mb-2 uppercase tracking-wider">Contas de teste (clique para preencher)</p>
          {CONTAS.map((c) => (
            <button
              key={c.email}
              type="button"
              onClick={() => { setEmail(c.email); setSenha(c.senha); }}
              className="block w-full rounded-lg px-2 py-1 text-left hover:bg-panel2"
            >
              <span className="text-white">{c.email}</span> · senha <span className="text-cyan">{c.senha}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
