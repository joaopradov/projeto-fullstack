import { useEffect, useReducer, useState } from "react";
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
      erro: "Não foi possível recuperar a estante salva.",
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

  useEffect(() => {
    // Preserva os dados anteriores se a leitura inicial falhar.
    if (dadosIniciais.erro) {
      return;
    }

    try {
      salvarEstante(estante);
      setErro("");
    } catch {
      setErro(
        "As alterações estão na tela, mas não puderam ser salvas no navegador."
      );
    }
  }, [estante, dadosIniciais.erro]);

  function adicionarLivro(livro) {
    dispatch({
      type: "ADICIONAR_LIVRO",
      livro,
    });
  }

  function removerLivro(id) {
    dispatch({
      type: "REMOVER_LIVRO",
      id,
    });
  }

  function alterarStatus(id, status) {
    dispatch({
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