import { useCanGoBack, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export function Voltar() {
  const router = useRouter();
  const podeVoltar = useCanGoBack();
  const caminho = useRouterState({ select: (estado) => estado.location.pathname });
  if (caminho === "/") return null;

  return (
    <div className="bg-ink px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Button
          variant="ghost"
          className="min-h-11 text-muted hover:bg-panel2 hover:text-cyan"
          onClick={() => {
            if (podeVoltar) router.history.back();
            else void router.navigate({ to: "/" });
          }}
        >
          <ArrowLeft aria-hidden="true" /> Voltar
        </Button>
      </div>
    </div>
  );
}