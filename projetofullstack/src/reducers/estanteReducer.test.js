import test from "node:test";
import assert from "node:assert/strict";
import { estanteReducer } from "./estanteReducer.js";

const livro = {
  id: "/works/OL123W",
  titulo: "Livro de teste",
  autor: "Autor de teste",
};

test("adiciona um livro sem modificar a lista anterior", () => {
  const anterior = [];

  const resultado = estanteReducer(anterior, {
    type: "ADICIONAR_LIVRO",
    livro,
  });

  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].id, livro.id);
  assert.equal(resultado[0].status, "quero-ler");
  assert.deepEqual(anterior, []);
});

test("não adiciona o mesmo livro duas vezes", () => {
  const anterior = [{ ...livro, status: "lendo" }];

  const resultado = estanteReducer(anterior, {
    type: "ADICIONAR_LIVRO",
    livro,
  });

  assert.deepEqual(resultado, anterior);
});

test("altera apenas o status do livro escolhido", () => {
  const anterior = [
    { ...livro, status: "quero-ler" },
    { ...livro, id: "/works/OUTRO", status: "quero-ler" },
  ];

  const resultado = estanteReducer(anterior, {
    type: "ALTERAR_STATUS",
    id: livro.id,
    status: "concluido",
  });

  assert.equal(resultado[0].status, "concluido");
  assert.equal(resultado[1].status, "quero-ler");
  assert.equal(anterior[0].status, "quero-ler");
});

test("ignora um status inválido", () => {
  const anterior = [{ ...livro, status: "lendo" }];

  const resultado = estanteReducer(anterior, {
    type: "ALTERAR_STATUS",
    id: livro.id,
    status: "invalido",
  });

  assert.deepEqual(resultado, anterior);
});

test("remove apenas o livro escolhido", () => {
  const outroLivro = {
    ...livro,
    id: "/works/OUTRO",
    status: "lendo",
  };

  const resultado = estanteReducer(
    [{ ...livro, status: "quero-ler" }, outroLivro],
    { type: "REMOVER_LIVRO", id: livro.id }
  );

  assert.deepEqual(resultado, [outroLivro]);
});