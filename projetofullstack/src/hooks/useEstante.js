import { useReducer, useRef, useState } from "react";
import { estanteReducer } from "../reducers/estanteReducer";
import {
  carregarEstante,
  salvarEstante,
} from "../services/estanteStorage";

function obterDadosIniciais() {
  try {
    return {
      livros: carregarEstante(),
      erro: "",
    };
  } catch {
    return {
      livros: [],
      erro:
        "Não foi possível recuperar a estante. A gravação está bloqueada para preservar os dados anteriores.",
    };
  }
}

export function useEstante() {
  const [dadosIniciais] = useState(obterDadosIniciais);

  const [estante, dispatch] = useReducer(
    estanteReducer,
    dadosIniciais.livros
  );

  const [erro, setErro] = useState(dadosIniciais.erro);

  const estanteAtual = useRef(dadosIniciais.livros);

  function executarAcao(acao) {
    const proximaEstante = estanteReducer(
      estanteAtual.current,
      acao
    );

    estanteAtual.current = proximaEstante;
    dispatch(acao);

    // Não sobrescreve dados que não conseguimos recuperar.
    if (dadosIniciais.erro) {
      return;
    }

    try {
      salvarEstante(proximaEstante);
      setErro("");
    } catch {
      setErro(
        "As alterações estão na tela, mas não puderam ser salvas no navegador."
      );
    }
  }

  function adicionarLivro(livro) {
    executarAcao({
      type: "ADICIONAR_LIVRO",
      livro,
    });
  }

  function removerLivro(id) {
    executarAcao({
      type: "REMOVER_LIVRO",
      id,
    });
  }

  function alterarStatus(id, status) {
    executarAcao({
      type: "ALTERAR_STATUS",
      id,
      status,
    });
  }

  return {
    estante,
    erro,
    adicionarLivro,
    removerLivro,
    alterarStatus,
  };
}