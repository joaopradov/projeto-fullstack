import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

function CapaLivro({ livro }) {
  const [falhou, setFalhou] = useState(false);

  return (
    <Box
      sx={{
        width: 100,
        height: 150,
        flexShrink: 0,
        bgcolor: "#eeece5",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {livro.capa && !falhou ? (
        <Box
          component="img"
          src={livro.capa}
          alt={`Capa de ${livro.titulo}`}
          loading="lazy"
          onError={() => setFalhou(true)}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ p: 1, textAlign: "center" }}
        >
          Capa indisponível
        </Typography>
      )}
    </Box>
  );
}

export default function Estante({
  estante,
  alterarStatus,
  removerLivro,
}) {
  const [filtro, setFiltro] = useState("todos");

  const livrosFiltrados = estante.filter(
    (livro) => filtro === "todos" || livro.status === filtro
  );

  return (
    <Box
      component="section"
      aria-labelledby="titulo-estante"
      sx={{ mt: 5 }}
    >
      <Typography
        id="titulo-estante"
        component="h2"
        variant="h5"
        gutterBottom
      >
        Minha estante ({estante.length})
      </Typography>

      <Tabs
        value={filtro}
        onChange={(_, novoFiltro) => setFiltro(novoFiltro)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Filtrar estante por status de leitura"
        sx={{ mb: 2 }}
      >
        <Tab label="Todos" value="todos" />
        <Tab label="Quero ler" value="quero-ler" />
        <Tab label="Lendo" value="lendo" />
        <Tab label="Concluídos" value="concluido" />
      </Tabs>

      {livrosFiltrados.length === 0 ? (
        <Typography>
          {estante.length === 0
            ? "Sua estante está vazia. Busque um livro para começar."
            : "Nenhum livro com este status."}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {livrosFiltrados.map((livro) => (
            <Paper key={livro.id} variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <CapaLivro key={livro.capa} livro={livro} />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography component="h3" variant="h6">
                    {livro.titulo}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    {livro.autor}
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                  >
                    <TextField
                      select
                      label="Status de leitura"
                      value={livro.status}
                      onChange={(evento) =>
                        alterarStatus(livro.id, evento.target.value)
                      }
                      size="small"
                      sx={{ minWidth: 180 }}
                    >
                      <MenuItem value="quero-ler">Quero ler</MenuItem>
                      <MenuItem value="lendo">Lendo</MenuItem>
                      <MenuItem value="concluido">Concluído</MenuItem>
                    </TextField>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removerLivro(livro.id)}
                      aria-label={`Remover ${livro.titulo} da estante`}
                    >
                      Remover
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}