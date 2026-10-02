import { useState } from "react";

const ANO_ATUAL = new Date().getFullYear();

// Converte a posição do controle (-1000 a 1000) em um ano.
// Escala "logarítmica": perto do meio anda de 1 em 1 ano, nas pontas pula milhões.
function posicaoParaAno(pos: number) {
  if (pos === 0) return ANO_ATUAL;
  const fracao = Math.abs(pos) / 1000;
  if (pos < 0) {
    const anosAtras = Math.round(Math.pow(65_000_000, fracao));
    return ANO_ATUAL - anosAtras;
  }
  const anosFrente = Math.round(Math.pow(3000 - ANO_ATUAL, fracao));
  return ANO_ATUAL + anosFrente;
}

// Quanto mais longe do presente, mais cara a passagem.
export function calcularPreco(ano: number) {
  const distancia = Math.abs(ano - ANO_ATUAL);
  if (distancia === 0) return 0;
  return Math.round(150 + 400 * Math.log10(1 + distancia));
}

function formatarAno(ano: number) {
  if (ano < 0) {
    const a = Math.abs(ano);
    if (a >= 1_000_000) return `${(a / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}M a.C.`;
    return `${a.toLocaleString("pt-BR")} a.C.`;
  }
  return `${ano} d.C.`;
}

function descreverDistancia(ano: number) {
  const d = ano - ANO_ATUAL;
  if (d === 0) return "Presente";
  const n = Math.abs(d).toLocaleString("pt-BR");
  const palavra = Math.abs(d) === 1 ? "ano" : "anos";
  return d < 0 ? `${n} ${palavra} atrás` : `daqui a ${n} ${palavra}`;
}

export function FiltroTempo() {
  const [posicao, setPosicao] = useState(-150);
  const ano = posicaoParaAno(posicao);
  const preco = calcularPreco(ano);

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-2.5 lg:px-8">
      <label htmlFor="filtro-tempo" className="text-[10px] uppercase tracking-[0.22em] text-muted">
        Escolha o momento
      </label>
      <div className="relative flex min-w-[200px] flex-1 items-center">
        <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-mint via-amber to-cyan opacity-80" />
        <input
          id="filtro-tempo"
          type="range"
          min={-1000}
          max={1000}
          step={1}
          value={posicao}
          onChange={(e) => setPosicao(Number(e.target.value))}
          className="seletor-tempo relative w-full"
          aria-valuetext={formatarAno(ano)}
        />
      </div>
      <div className="flex items-center gap-3 text-xs tabular-nums">
        <span className="font-semibold text-white">{formatarAno(ano)}</span>
        <span className="text-muted">{descreverDistancia(ano)}</span>
        <span className="rounded-full bg-cyan/15 px-2.5 py-1 font-semibold text-cyan">
          {preco === 0 ? "Grátis" : `${preco.toLocaleString("pt-BR")} TC`}
        </span>
      </div>
    </div>
  );
}
