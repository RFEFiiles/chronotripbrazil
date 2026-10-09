import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SISTEMA = `Você é a Lia, assistente virtual da ChronoTripBrazil, uma agência FICTÍCIA de viagens no tempo.
Responda sempre em português do Brasil, de forma simpática, divertida e curta (até 3 frases).
Informações da agência (moeda fictícia: TC = tempo-cred):
- Vale dos Dinossauros (65 milhões de anos atrás): 7 dias, 4.200 TC. Ficar na cápsula de observação.
- Egito Antigo (2500 a.C.): 5 dias, 3.600 TC.
- Castelo medieval (1100), Florença renascentista (1500), Litoral 2050 e Nova Aurora (ano 3000, 10 dias, 8.900 TC, rota mais procurada).
- O preço depende da distância no tempo: quanto mais perto do presente, mais barato. O cliente escolhe o ano no controle "Escolha o momento" no topo e clica em "Comprar passagem".
- Classe premium custa 60% a mais. Até 10 passageiros por compra.
- Segurança: monitoramento 24/7, qualquer alteração no passado é revertida em até 90 segundos (protocolo anti-paradoxo).
- Para comprar é preciso entrar na conta pelo botão "Entrar" no topo. No perfil dá pra trocar foto, nome e celular e ver "Minhas viagens".
Se perguntarem algo fora do tema, responda brevemente e puxe o assunto de volta para viagens no tempo.`;

const Entrada = z.object({
  mensagens: z.array(z.object({ autor: z.enum(["lia", "voce"]), texto: z.string() })),
});

export const perguntarLia = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Entrada.parse(d))
  .handler(async ({ data }) => {
    const chave = process.env["LOVABLE_API_KEY"];
    if (!chave) return { texto: "", erro: "Assistente sem configuração no momento." };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${chave}`,
        "Content-Type": "application/json",
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [
          { role: "system", content: SISTEMA },
          ...data.mensagens.slice(-20).map((m) => ({
            role: m.autor === "voce" ? "user" : "assistant",
            content: m.texto,
          })),
        ],
      }),
    });

    if (!resp.ok || !resp.body) {
      if (resp.status === 429) return { texto: "", erro: "Muita gente falando comigo agora! Tente de novo em instantes." };
      if (resp.status === 402) return { texto: "", erro: "Os créditos de IA acabaram. Peça ao dono do site para recarregar." };
      return { texto: "", erro: "A Lia está fora do ar no momento. Tente mais tarde." };
    }

    // Lê o streaming e junta o texto final
    const leitor = resp.body.getReader();
    const dec = new TextDecoder();
    let buffer = "";
    let texto = "";
    while (true) {
      const { done, value } = await leitor.read();
      if (done) break;
      buffer += dec.decode(value, { stream: true });
      const linhas = buffer.split("\n");
      buffer = linhas.pop() ?? "";
      for (const l of linhas) {
        const t = l.trim();
        if (!t.startsWith("data:")) continue;
        const json = t.slice(5).trim();
        if (json === "[DONE]") continue;
        try {
          texto += JSON.parse(json).choices?.[0]?.delta?.content ?? "";
        } catch {
          /* frame incompleto */
        }
      }
    }
    return { texto: texto.trim() || "Hmm, não consegui pensar em nada agora. Pode repetir?", erro: null };
  });
