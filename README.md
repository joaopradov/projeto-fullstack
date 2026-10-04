# Minha Estante

Projeto desenvolvido para a disciplina Programação Web Fullstack.

Aplicação SPA em React para buscar livros na Open Library e organizar
uma estante pessoal. As funcionalidades aparecem em uma única página,
sem recarregamento durante as interações.

## Funcionalidades

- Busca de livros por título ou autor.
- Exibição de capas, com alternativa para imagens indisponíveis.
- Consulta dos dados do livro em uma janela modal.
- Adição à estante sem duplicação.
- Organização por status: Quero ler, Lendo e Concluído.
- Filtro por status de leitura.
- Remoção de livros.
- Persistência da estante no navegador com localStorage.
- Mensagens de carregamento, erro e resultados vazios.

## Tecnologias

- React e Vite.
- JavaScript.
- Material UI: componentes da interface.
- Fetch API: requisições AJAX.
- Open Library: API pública de livros.
- localStorage: armazenamento local.

## Recurso React escolhido: useReducer

O useReducer controla o estado da estante por meio de três ações:

- ADICIONAR_LIVRO
- REMOVER_LIVRO
- ALTERAR_STATUS

As regras estão em src/reducers/estanteReducer.js.
O Hook useEstante conecta essas regras ao armazenamento e à interface.

## API utilizada

Busca:
https://openlibrary.org/dev/docs/api/search

Capas:
https://openlibrary.org/dev/docs/api/covers

As consultas são feitas diretamente pelo navegador.
Não há backend próprio neste projeto.

## Executar localmente

Ambiente utilizado: Node.js 24 e npm.

Na pasta que contém o package.json da aplicação:

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no terminal.

## Verificações

```bash
node --test src/reducers/estanteReducer.test.js
npm run lint
npm run build
```

Os cinco testes verificam adição sem alteração da lista anterior,
prevenção de duplicação, alteração de status, rejeição de status
inválido e remoção do livro escolhido.

## Organização

- src/components: componentes visuais.
- src/hooks: integração da lógica com o React.
- src/services: consulta à API e armazenamento local.
- src/reducers: regras de atualização da estante.
- src/App.jsx: composição da página.

## Integrantes e responsabilidades

Preencher com os nomes e as contribuições reais de cada integrante:

- Integrante 1: [nome e responsabilidades].
- Integrante 2: [nome e responsabilidades].

## Ferramentas de apoio e uso de IA

Foi utilizado o Codex, assistente de IA, para apoiar o planejamento,
sugerir código, explicar conceitos, auxiliar na criação de testes
e na correção de erros.

Os comandos e a edição dos arquivos foram realizados pelos integrantes
durante o desenvolvimento guiado. Cada integrante deve revisar e
compreender o código correspondente às suas contribuições.

O Vite foi utilizado para gerar a estrutura inicial da aplicação.

## Limitações

- A estante fica salva apenas no navegador utilizado.
- Não há autenticação nem sincronização entre dispositivos.
- A busca e o carregamento das capas dependem da conexão com a internet
  e da disponibilidade da Open Library.
- Alguns livros podem apresentar dados incompletos ou capas ausentes.