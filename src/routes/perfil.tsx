import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { salvarPerfil, useUsuario } from "../lib/contas";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil · ChronoTripBrazil" },
      { name: "description", content: "Personalize sua foto, nome e telefone na ChronoTripBrazil." },
      { property: "og:title", content: "Meu perfil · ChronoTripBrazil" },
      { property: "og:description", content: "Personalize sua foto, nome e telefone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Perfil,
});

function formatarTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Perfil() {
  const usuario = useUsuario();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState<string | undefined>();
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setTelefone(usuario.telefone ?? "");
      setFoto(usuario.foto);
    }
  }, [usuario?.email]);

  if (!usuario) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink p-6 text-center text-white">
        <p className="text-muted">Você precisa entrar para ver seu perfil.</p>
        <Link to="/login" className="rounded-full bg-cyan px-6 py-3 font-semibold text-ink">Entrar</Link>
      </main>
    );
  }

  const escolherFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const img = new Image();
    img.onload = () => {
      // reduz a foto pra caber no navegador
      const c = document.createElement("canvas");
      const t = 256;
      c.width = t; c.height = t;
      const lado = Math.min(img.width, img.height);
      c.getContext("2d")!.drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, t, t);
      setFoto(c.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(arquivo);
  };

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    salvarPerfil({ email: usuario.email, nome: nome.trim() || usuario.nome, telefone, foto });
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  return (
    <main className="min-h-screen bg-ink px-6 py-12 text-white">
      <div className="mx-auto max-w-lg">
        <Link to="/" className="text-sm text-muted hover:text-white">← Voltar</Link>
        <h1 className="mt-6 font-display text-4xl">Meu perfil</h1>
        <p className="mt-2 text-muted">{usuario.email}</p>

        <form onSubmit={salvar} className="mt-8 space-y-6 rounded-2xl border border-line bg-panel p-6">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-line bg-panel2 text-3xl text-cyan">
              {foto ? <img src={foto} alt="Foto de perfil" className="h-full w-full object-cover" /> : nome.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer rounded-full border border-cyan px-4 py-2 text-sm text-cyan hover:bg-cyan hover:text-ink">
                Trocar foto
                <input type="file" accept="image/*" onChange={escolherFoto} className="hidden" />
              </label>
              {foto && (
                <button type="button" onClick={() => setFoto(undefined)} className="text-xs text-muted hover:text-white">Remover foto</button>
              )}
            </div>
          </div>

          <label className="block">
            <span className="text-sm text-muted">Nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-panel2 px-4 py-3 outline-none focus:border-cyan" />
          </label>

          <label className="block">
            <span className="text-sm text-muted">Telefone / celular</span>
            <input value={telefone} onChange={(e) => setTelefone(formatarTelefone(e.target.value))} placeholder="(11) 91234-5678" inputMode="tel" className="mt-1 w-full rounded-xl border border-line bg-panel2 px-4 py-3 outline-none focus:border-cyan" />
          </label>

          <button className="w-full rounded-full bg-cyan py-3 font-semibold text-ink hover:opacity-90">Salvar alterações</button>
          {salvo && <p className="text-center text-sm text-mint">Perfil salvo! ✓</p>}
        </form>
      </div>
    </main>
  );
}
