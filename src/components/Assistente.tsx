import { useState } from "react";

type Mensagem = { autor: "lia" | "voce"; texto: string };

// Respostas prontas: a assistente procura palavras-chave na pergunta.
function responder(pergunta: string): string {
  const p = pergunta.toLowerCase();
  if (p.includes("preço") || p.includes("preco") || p.includes("caro") || p.includes("custa"))
    return "O preço depende da distância no tempo: quanto mais perto do presente, mais barato. Use o controle 'Escolha o momento' no topo pra ver o valor!";
  if (p.includes("dinossauro")) return "O Vale dos Dinossauros dura 7 dias e custa 4.200 TC. Fique sempre dentro da cápsula de observação! 🦖";
  if (p.includes("egito")) return "O Egito Antigo (2500 a.C.) dura 5 dias por 3.600 TC. Leve protetor solar!";
  if (p.includes("futuro") || p.includes("3000")) return "Nova Aurora, no ano 3000, é nossa rota mais procurada: 10 dias por 8.900 TC.";
  if (p.includes("seguro") || p.includes("paradoxo") || p.includes("perigo"))
    return "Toda viagem é monitorada 24/7. Qualquer alteração no passado é revertida em até 90 segundos.";
  if (p.includes("login") || p.includes("conta") || p.includes("entrar"))
    return "Você pode entrar na sua conta clicando em 'Entrar' no topo da página.";
  if (p.includes("oi") || p.includes("olá") || p.includes("ola")) return "Oi! Pra quando você quer viajar? ⏳";
  return "Hmm, não sei responder isso ainda. Pergunte sobre preços, destinos (dinossauros, Egito, futuro) ou segurança!";
}

export function Assistente() {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { autor: "lia", texto: "Olá! Eu sou a Lia, sua crononauta virtual. Como posso ajudar na sua viagem?" },
  ]);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const pergunta = texto.trim();
    if (!pergunta) return;
    setMensagens((m) => [...m, { autor: "voce", texto: pergunta }, { autor: "lia", texto: responder(pergunta) }]);
    setTexto("");
  }

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {aberto && (
        <div className="flex h-[440px] w-[320px] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
          <div className="flex items-center gap-3 border-b border-line bg-panel2 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-cyan to-amber font-display font-semibold text-ink">L</span>
            <div>
              <p className="text-sm font-semibold">Lia</p>
              <p className="text-[11px] text-mint">● online em todas as eras</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {mensagens.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.autor === "voce" ? "ml-auto bg-cyan text-ink" : "bg-panel2 text-white"
                }`}
              >
                {m.texto}
              </p>
            ))}
          </div>
          <form onSubmit={enviar} className="flex gap-2 border-t border-line p-3">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Pergunte algo..."
              className="flex-1 rounded-full border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-cyan"
              autoFocus
            />
            <button className="rounded-full bg-cyan px-4 text-sm font-semibold text-ink">Enviar</button>
          </form>
        </div>
      )}
      <button
        onClick={() => setAberto(!aberto)}
        className="rounded-full bg-gradient-to-br from-cyan to-amber px-5 py-3 text-sm font-semibold text-ink shadow-lg"
      >
        {aberto ? "Fechar" : "Fale com a Lia"}
      </button>
    </div>
  );
}
