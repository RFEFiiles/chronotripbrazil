import { useEffect, useState } from "react";

// Contas de demonstração (projeto só frontend — não existe servidor).
export const CONTAS = [
  { email: "marty@chrono.com", senha: "1985", nome: "Marty" },
  { email: "lia@chrono.com", senha: "tempo123", nome: "Lia" },
  { email: "admin@chrono.com", senha: "admin2026", nome: "Admin" },
];

const CHAVE = "chrono-usuario";

export type Usuario = { email: string; nome: string; foto?: string; telefone?: string };

const perfilChave = (email: string) => `chrono-perfil-${email}`;

export function salvarPerfil(dados: Usuario) {
  localStorage.setItem(CHAVE, JSON.stringify(dados));
  localStorage.setItem(perfilChave(dados.email), JSON.stringify(dados));
  window.dispatchEvent(new Event("chrono-auth"));
}

export function entrar(email: string, senha: string): Usuario | null {
  const conta = CONTAS.find((c) => c.email === email.trim().toLowerCase() && c.senha === senha);
  if (!conta) return null;
  const salvo = localStorage.getItem(perfilChave(conta.email));
  const usuario: Usuario = salvo ? JSON.parse(salvo) : { email: conta.email, nome: conta.nome };
  localStorage.setItem(CHAVE, JSON.stringify(usuario));
  window.dispatchEvent(new Event("chrono-auth"));
  return usuario;
}

export function sair() {
  localStorage.removeItem(CHAVE);
  window.dispatchEvent(new Event("chrono-auth"));
}

export function useUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  useEffect(() => {
    const ler = () => {
      const bruto = localStorage.getItem(CHAVE);
      setUsuario(bruto ? JSON.parse(bruto) : null);
    };
    ler();
    window.addEventListener("chrono-auth", ler);
    return () => window.removeEventListener("chrono-auth", ler);
  }, []);
  return usuario;
}
