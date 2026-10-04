export function estanteReducer(estante, acao) {
  switch (acao.type) {
    case "ADICIONAR_LIVRO": {
      const jaExiste = estante.some(
        (livro) => livro.id === acao.livro.id
      );

      if (jaExiste) {
        return estante;
      }

      return [
        ...estante,
        { ...acao.livro, status: "quero-ler" },
      ];
    }

    case "REMOVER_LIVRO":
      return estante.filter((livro) => livro.id !== acao.id);

    case "ALTERAR_STATUS": {
      const statusPermitidos = ["quero-ler", "lendo", "concluido"];

      if (!statusPermitidos.includes(acao.status)) {
        return estante;
      }

      return estante.map((livro) =>
        livro.id === acao.id
          ? { ...livro, status: acao.status }
          : livro
      );
    }

    default:
      return estante;
  }
}