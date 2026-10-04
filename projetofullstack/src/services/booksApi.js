export async function buscarLivros(termo) {
  const busca = termo.trim();

  if (!busca) {
    return [];
  }

  const parametros = new URLSearchParams({
    q: busca,
    limit: "12",
    fields: "key,title,author_name,cover_i,first_publish_year",
  });

  const resposta = await fetch(
    `https://openlibrary.org/search.json?${parametros}`
  );

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar os livros. Tente novamente.");
  }

  const dados = await resposta.json();

  return dados.docs.map((livro) => ({
    id: livro.key,
    titulo: livro.title,
    autor: livro.author_name?.join(", ") || "Autor desconhecido",
    ano: livro.first_publish_year || "Não informado",
    capa: livro.cover_i
      ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg?default=false`
      : null,
  }));
}