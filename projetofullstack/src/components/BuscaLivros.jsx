import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

export default function BuscaLivros({ pesquisar, carregando }) {
  const [termo, setTermo] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();

    if (!termo.trim() || carregando) return;

    pesquisar(termo.trim());
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ my: 3 }}
    >
      <TextField
        label="Buscar por título ou autor"
        placeholder="Ex.: Machado de Assis"
        value={termo}
        onChange={(evento) => setTermo(evento.target.value)}
        disabled={carregando}
        fullWidth
        required
        type="search"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={carregando || !termo.trim()}
        sx={{ minWidth: 130 }}
      >
        {carregando ? "Buscando..." : "Buscar"}
      </Button>
    </Stack>
  );
}