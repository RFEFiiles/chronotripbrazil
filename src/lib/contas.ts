import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Usuario = { id: string; email: string; nome: string; foto?: string | undefined; telefone?: string | undefined };

async function carregarUsuario(): Promise<Usuario | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  const { data: perfil } = await supabase.from("profiles").select("nome, telefone, foto").eq("id", user.id).maybeSingle();
  return {
    id: user.id,
    email: user.email ?? "",
    nome: perfil?.nome || user.email?.split("@")[0] || "Crononauta",
    telefone: perfil?.telefone ?? undefined,
    foto: perfil?.foto ?? undefined,
  };
}

export async function entrar(email: string, senha: string): Promise<string | null> {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });
  if (error) return error.message === "Email not confirmed" ? "Confirme seu e-mail antes de entrar." : "E-mail ou senha incorretos.";
  return null;
}

export async function cadastrar(nome: string, email: string, senha: string): Promise<{ erro?: string; precisaConfirmar?: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: senha,
    options: { data: { nome }, emailRedirectTo: window.location.origin },
  });
  if (error) return { erro: error.message.includes("Password") ? "A senha precisa ter pelo menos 6 caracteres." : "Não foi possível criar a conta." };
  return { precisaConfirmar: !data.session };
}

export async function sair() {
  await supabase.auth.signOut();
}

export async function salvarPerfil(dados: { nome: string; telefone?: string; foto?: string | null }) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return "Sessão expirada.";
  const { error } = await supabase
    .from("profiles")
    .update({ nome: dados.nome, telefone: dados.telefone || null, foto: dados.foto ?? null })
    .eq("id", data.user.id);
  if (error) return "Erro ao salvar.";
  window.dispatchEvent(new Event("chrono-perfil"));
  return null;
}

export function useUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    let ativo = true;
    const ler = () => carregarUsuario().then((u) => { if (ativo) { setUsuario(u); setCarregando(false); } });
    ler();
    const { data: sub } = supabase.auth.onAuthStateChange((evento) => {
      if (evento === "SIGNED_IN" || evento === "SIGNED_OUT" || evento === "USER_UPDATED") setTimeout(ler, 0);
    });
    window.addEventListener("chrono-perfil", ler);
    return () => { ativo = false; sub.subscription.unsubscribe(); window.removeEventListener("chrono-perfil", ler); };
  }, []);
  return { usuario, carregando };
}

export type Compra = { codigo: string; destino: string; ano: number; passageiros: number; classe: string; total: number; criado_em: string };

export async function registrarCompra(c: Omit<Compra, "criado_em" | "codigo">): Promise<{ codigo?: string; erro?: string }> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { erro: "Entre para comprar." };
  const codigo = `CTB-${Math.floor(100000 + Math.random() * 900000)}`;
  const { error } = await supabase.from("compras").insert({ ...c, codigo, user_id: data.user.id });
  if (error) return { erro: "Não foi possível registrar a compra." };
  return { codigo };
}

export async function listarCompras(): Promise<Compra[]> {
  const { data } = await supabase
    .from("compras")
    .select("codigo, destino, ano, passageiros, classe, total, criado_em")
    .order("criado_em", { ascending: false });
  return (data ?? []) as Compra[];
}
