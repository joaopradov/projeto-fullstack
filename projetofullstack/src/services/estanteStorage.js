const CHAVE_ESTANTE = "minha-estante";

export function carregarEstante() {
  const dados = localStorage.getItem(CHAVE_ESTANTE);

  if (!dados) {
    return [];
  }

  const estante = JSON.parse(dados);

  const statusPermitidos = ["quero-ler", "lendo", "concluido"];

  const dadosValidos =
    Array.isArray(estante) &&
    estante.every(
      (livro) =>
        livro !== null &&
        typeof livro === "object" &&
        typeof livro.id === "string" &&
        typeof livro.titulo === "string" &&
        statusPermitidos.includes(livro.status)
    );

  if (!dadosValidos) {
    throw new Error("Os dados salvos da estante são inválidos.");
  }

  return estante;
}

export function salvarEstante(estante) {
  localStorage.setItem(CHAVE_ESTANTE, JSON.stringify(estante));
}