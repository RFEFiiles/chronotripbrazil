import { useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { perguntarLia } from "@/lib/lia.functions";

type Mensagem = { autor: "lia" | "voce"; texto: string };

export function Assistente() {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { autor: "lia", texto: "Olá! Eu sou a Lia, sua crononauta virtual. Como posso ajudar na sua viagem?" },
  ]);

  const [pensando, setPensando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const pergunta = texto.trim();
    if (!pergunta || pensando) return;
    const nova = [...mensagens, { autor: "voce" as const, texto: pergunta }];
    setMensagens(nova);
    setTexto("");
    setPensando(true);
    try {
      const r = await perguntarLia({ data: { mensagens: nova } });
      setMensagens((m) => [...m, { autor: "lia", texto: r.erro ?? r.texto }]);
    } catch {
      setMensagens((m) => [...m, { autor: "lia", texto: "Ops, perdi a conexão com o tempo. Tente de novo!" }]);
    } finally {
      setPensando(false);
    }
  }

  return (
    <div className="fixed right-3 bottom-3 z-50 sm:right-5 sm:bottom-5 flex flex-col items-end gap-3">
      {aberto && (
        <div className="flex h-[min(440px,calc(100dvh-100px))] w-[min(360px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
          <div className="flex items-center gap-3 border-b border-line bg-panel2 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-cyan to-amber font-display font-semibold text-ink">L</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Lia</p>
              <p className="text-[11px] text-mint">● online em todas as eras</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Fechar conversa" title="Fechar conversa" onClick={() => setAberto(false)} className="size-11 shrink-0 text-muted hover:bg-panel hover:text-cyan"><X /></Button>
          </div>
          <div role="log" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {mensagens.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] break-words rounded-2xl px-3 py-2 text-sm ${
                  m.autor === "voce" ? "ml-auto bg-cyan text-ink" : "bg-panel2 text-readable"
                }`}
              >
                {m.texto}
              </p>
            ))}
            {pensando && <p className="w-fit rounded-2xl bg-panel2 px-3 py-2 text-sm text-muted">Lia está digitando...</p>}
          </div>
          <form onSubmit={enviar} className="flex gap-2 border-t border-line p-3">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Pergunte algo..."
              className="min-w-0 flex-1 rounded-full border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-cyan"
              aria-label="Mensagem para a Lia"
            />
            <Button type="submit" disabled={pensando || !texto.trim()} size="icon" aria-label="Enviar mensagem" title="Enviar mensagem" className="size-11 shrink-0 rounded-full bg-cyan text-ink hover:bg-cyan/90"><Send /></Button>
          </form>
        </div>
      )}
      <Button
        aria-expanded={aberto}
        onClick={() => setAberto(!aberto)}
        className="h-12 rounded-full bg-gradient-to-br from-cyan to-amber px-5 py-3 text-sm font-semibold text-ink shadow-lg"
      >
        {aberto ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        {aberto ? "Fechar" : "Fale com a Lia"}
      </Button>
    </div>
  );
}
