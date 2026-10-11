import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { entrar, ehFuncionario, sair } from "../lib/contas";

export const Route = createFileRoute("/equipe/login")({
  head: () => ({
    meta: [
      { title: "Acesso da equipe · ChronoTripBrazil" },
      { name: "description", content: "Área restrita para funcionários da ChronoTripBrazil." },
      { property: "og:title", content: "Acesso da equipe · ChronoTripBrazil" },
      { property: "og:description", content: "Login dos funcionários da agência." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginEquipe,
});

function LoginEquipe() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); setEnviando(true);
    const falha = await entrar(email, senha);
    if (falha) { setErro(falha); setEnviando(false); return; }
    if (!(await ehFuncionario())) {
      await sair();
      setErro("Essa conta não é de funcionário.");
      setEnviando(false);
      return;
    }
    navigate({ to: "/equipe" });
  };

  const campo = "mt-1 w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-amber";

  return (
    <div className="relative grid min-h-[calc(100dvh-60px)] place-items-center overflow-hidden bg-ink px-4 py-6 sm:px-6 sm:py-10 text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-amber/10 blur-[120px]" />
      <div className="relative w-full max-w-sm rounded-2xl border border-amber/40 bg-panel p-5 sm:p-8">
        <span className="rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">ÁREA DA EQUIPE</span>
        <h1 className="mt-4 font-display text-3xl">Acesso de funcionário</h1>
        <p className="mt-2 text-sm text-muted">Entre com sua conta da empresa.</p>
        <form onSubmit={enviar} className="mt-6 space-y-4">
          <label className="block text-sm"><span className="text-muted">E-mail</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={campo} />
          </label>
          <label className="block text-sm"><span className="text-muted">Senha</span>
            <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} className={campo} />
          </label>
          <button disabled={enviando} className="w-full rounded-full bg-amber py-3 text-sm font-semibold text-ink disabled:opacity-60">
            {enviando ? "Aguarde..." : "Entrar na equipe"}
          </button>
        </form>
        {erro && <p className="mt-4 rounded-xl bg-rose/15 px-3 py-2 text-sm text-rose">{erro}</p>}
        <Link to="/login" className="mt-6 block text-center text-sm text-muted hover:text-white">É cliente? Entrar aqui</Link>
      </div>
    </div>
  );
}
