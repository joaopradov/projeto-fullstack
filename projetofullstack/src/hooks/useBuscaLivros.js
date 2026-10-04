import { useRef, useState } from "react";
import { buscarLivros } from "../services/booksApi";

export function useBuscaLivros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [buscou, setBuscou] = useState(false);

  const ultimaBusca = useRef(0);

  async function pesquisar(termo) {
    const idBusca = ++ultimaBusca.current;

    setErro("");
    setLivros([]);
    setBuscou(false);

    if (!termo.trim()) {
      setCarregando(false);
      return;
    }

    setCarregando(true);

    try {
      const resultado = await buscarLivros(termo);

      if (idBusca !== ultimaBusca.current) return;

      setLivros(resultado);
      setBuscou(true);
    } catch {
      if (idBusca !== ultimaBusca.current) return;

      setErro("Não foi possível buscar os livros. Tente novamente.");
    } finally {
      if (idBusca === ultimaBusca.current) {
        setCarregando(false);
      }
    }
  }

  return {
    livros,
    carregando,
    erro,
    buscou,
    pesquisar,
  };
}