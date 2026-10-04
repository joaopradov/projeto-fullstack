import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import BuscaLivros from "./components/BuscaLivros";
import LivroCard from "./components/LivroCard";
import Estante from "./components/Estante";
import { useBuscaLivros } from "./hooks/useBuscaLivros";
import { useEstante } from "./hooks/useEstante";

export default function App() {
  const {
    livros,
    carregando,
    erro,
    buscou,
    pesquisar,
  } = useBuscaLivros();

  const {
    estante,
    erro: erroEstante,
    adicionarLivro,
    removerLivro,
    alterarStatus,
  } = useEstante();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography component="h1" variant="h3" gutterBottom>
        Minha Estante
      </Typography>

      <Typography>
        Descubra livros e organize suas leituras.
      </Typography>

      <BuscaLivros
        pesquisar={pesquisar}
        carregando={carregando}
      />

      {carregando && (
        <Box role="status" sx={{ my: 3 }}>
          <CircularProgress size={24} aria-label="Buscando livros" />
          <Typography>Buscando livros...</Typography>
        </Box>
      )}

      {erro && <Alert severity="error">{erro}</Alert>}

      {buscou && livros.length === 0 && (
        <Alert severity="info">Nenhum livro encontrado.</Alert>
      )}

      {erroEstante && (
        <Alert severity="warning" sx={{ my: 2 }}>
          {erroEstante}
        </Alert>
      )}

      <Typography sx={{ my: 2 }}>
        Livros na sua estante: {estante.length}
      </Typography>

      <Box
        component="section"
        aria-label="Resultados da busca"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {livros.map((livro) => (
          <LivroCard
            key={livro.id}
            livro={livro}
            adicionarLivro={adicionarLivro}
            naEstante={estante.some((item) => item.id === livro.id)}
          />
        ))}
      </Box>

      <Estante
        estante={estante}
        alterarStatus={alterarStatus}
        removerLivro={removerLivro}
      />
    </Container>
  );
}