import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { cadastrar, entrar } from "../lib/contas";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar · ChronoTripBrazil Agência de Viagem Temporal" },
      { name: "description", content: "Entre ou crie sua conta ChronoTripBrazil para comprar passagens no tempo." },
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
  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); setAviso(""); setEnviando(true);
    if (modo === "entrar") {
      const falha = await entrar(email, senha);
      setEnviando(false);
      if (falha) setErro(falha); else navigate({ to: "/" });
    } else {
      const r = await cadastrar(nome.trim() || (email.split("@")[0] ?? ""), email, senha);
      setEnviando(false);
      if (r.erro) setErro(r.erro);
      else if (r.precisaConfirmar) { setAviso("Conta criada! Agora entre com seu e-mail e senha."); setModo("entrar"); }
      else navigate({ to: "/" });
    }
  };

  const campo = "mt-1 w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-cyan";

  return (
    <div className="relative grid min-h-[calc(100dvh-60px)] place-items-center overflow-hidden bg-ink px-4 py-6 sm:px-6 sm:py-10 font-sans text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative w-full max-w-sm rounded-2xl border border-line bg-panel p-5 sm:p-8">
        <Link to="/" className="mb-6 flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-cyan to-amber font-display text-lg font-semibold text-ink">C</span>
          <span className="text-sm font-semibold">ChronoTripBrazil</span>
        </Link>
        <h1 className="font-display text-3xl font-medium">{modo === "entrar" ? "Bem-vindo, crononauta" : "Criar conta"}</h1>
        <p className="mt-2 text-sm text-muted">{modo === "entrar" ? "Entre para comprar suas passagens no tempo." : "Cadastre-se para embarcar."}</p>
        <form onSubmit={enviar} className="mt-6 space-y-4">
          {modo === "cadastrar" && (
            <label className="block text-sm">
              <span className="text-muted">Nome</span>
              <input required value={nome} onChange={(e) => setNome(e.target.value)} className={campo} />
            </label>
          )}
          <label className="block text-sm">
            <span className="text-muted">E-mail</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={campo} />
          </label>
          <label className="block text-sm">
            <span className="text-muted">Senha</span>
            <input type="password" required minLength={6} value={senha} onChange={(e) => setSenha(e.target.value)} className={campo} />
          </label>
          <button disabled={enviando} className="w-full rounded-full bg-cyan py-3 text-sm font-semibold text-ink disabled:opacity-60">
            {enviando ? "Aguarde..." : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>
        {erro && <p className="mt-4 rounded-xl bg-rose/15 px-3 py-2 text-sm text-rose">{erro}</p>}
        {aviso && <p className="mt-4 rounded-xl bg-mint/15 px-3 py-2 text-sm text-mint">{aviso}</p>}
        <button
          type="button"
          onClick={() => { setModo(modo === "entrar" ? "cadastrar" : "entrar"); setErro(""); }}
          className="mt-6 w-full text-center text-sm text-muted hover:text-white"
        >
          {modo === "entrar" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
        </button>
        <Link to="/equipe/login" className="mt-3 block text-center text-xs text-muted hover:text-amber">Sou funcionário</Link>
      </div>
    </div>
  );
}
