import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

export default function LivroCard({
  livro,
  adicionarLivro,
  naEstante,
}) {
  const [capaComErro, setCapaComErro] = useState(false);
  const [detalhesAbertos, setDetalhesAbertos] = useState(false);

  function renderizarCapa() {
    if (!livro.capa || capaComErro) {
      return (
        <Typography color="text.secondary">
          Capa indisponível
        </Typography>
      );
    }

    return (
      <Box
        component="img"
        src={livro.capa}
        alt={`Capa de ${livro.titulo}`}
        loading="lazy"
        onError={() => setCapaComErro(true)}
        sx={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    );
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: 220,
            p: 2,
            bgcolor: "#eeece5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderizarCapa()}
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography component="h2" variant="h6">
            {livro.titulo}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            {livro.autor}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Ano informado pela API: {livro.ano}
          </Typography>
        </CardContent>

        <Stack spacing={1} sx={{ p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            onClick={() => setDetalhesAbertos(true)}
          >
            Ver detalhes
          </Button>

          <Button
            variant="contained"
            disabled={naEstante}
            onClick={() => adicionarLivro(livro)}
          >
            {naEstante ? "Na sua estante" : "Adicionar à estante"}
          </Button>
        </Stack>
      </Card>

      <Dialog
        open={detalhesAbertos}
        onClose={() => setDetalhesAbertos(false)}
        aria-labelledby={`detalhes-${livro.id}`}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id={`detalhes-${livro.id}`}>
          {livro.titulo}
        </DialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              height: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            {renderizarCapa()}
          </Box>

          <Typography gutterBottom>
            <strong>Autor:</strong> {livro.autor}
          </Typography>

          <Typography gutterBottom>
            <strong>Ano informado pela API:</strong> {livro.ano}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Fonte dos dados: Open Library.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button onClick={() => setDetalhesAbertos(false)}>
            Fechar
          </Button>

          <Button
            variant="contained"
            disabled={naEstante}
            onClick={() => adicionarLivro(livro)}
          >
            {naEstante ? "Na sua estante" : "Adicionar à estante"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}