# Estrutura do Projeto

Nossa organização de pastas foi desenhada para facilitar o entendimento e a manutenibilidade do código. Seguimos os padrões mais recomendáveis do mercado (ecossistema React/Vite) separando logicamente nossas camadas.

Abaixo você encontra um mapa completo das pastas e onde alocar cada pedaço do seu código. Dessa forma, garantimos que **qualquer um consiga entender o fluxo geral**.

## 💻 1. Raiz do Projeto (`/`)

A pasta raiz fica reservada apenas para configurações-chave, dependências e documentos essenciais. Nenhum código lógico de interface fica exposto aqui diretamente.

- 📁 **`public/`**: Pasta de assets brutos. Guardamos aqui o `favicon`, imagens locais genéricas e pequenos recursos textuais estáticos que nunca mudam e não precisam passar pelo processador de compilação do Vite.
- 📄 **`package.json`**: Nosso "RG" do projeto. Contém todas as dependências, versionamentos e bibliotecas atreladas à nossa aplicação, e os scripts utilizados (como rodar e buildar).
- 📄 **`README.md`**: Descritivo geral do projeto, provendo um ponto de partida.
- 📄 **`relatorio.md`**: Como exigido pelas nossas boas práticas, aqui registramos o log cronológico, as atualizações importantes, as horas e os títulos das alterações.
- 📄 **`framewor e linguagens.md`**: Qualificação simples aprofundada da Tech Stack completa que suporta a aplicação.
- 📄 **Arquivos de config (ex: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`)**: Configuram, respectivamente, como operam o build, as classes de estilo padrão e o rigor de testes no nosso editor de código.

## 🗂️ 2. Coração da Aplicação (`src/`)

A pasta `/src` é onde de fato acontece nosso desenvolvimento contínuo em TypeScript/React. Cada subpasta tem seu propósito e não devem ser misturadas:

- 📁 **`src/components/`**
  - Aqui estão organizados os blocos construtores que geram uma interface. (Ex.: botões de confirmação, barras de navegação (navbar), formulários isolados, avatares, popups etc.). Tudo o que se repetirá nas páginas ou servem como "micro interfaces" vão aqui dentro. Muitas vezes as primitivas de componentes base ficam dentro de `/components/ui`.
  
- 📁 **`src/data/`**
  - Dedicada a exportar informações tabuladas e arquivos estáticos (dados falsos/Mocks de JSON). É útil principalmente quando se prototipa algo sem backend, para não "sujar" as telas visuais com grandes blocos de strings.

- 📁 **`src/hooks/`**
  - Armazena comportamentos personalizados (Custom Hooks do React). Sempre que sua funcionalidade for um bloco de lógica baseada em variáveis reativas (como verificação do celular, checagem da sessão ativa ou busca inteligente de uma API), e puder ser reaproveitada por vários painéis, se abstrai um gancho (com prefixo `useAlgumaCoisa`).

- 📁 **`src/lib/`**
  - Diferente do hook, nesta pasta você salva **puramente lógica** computacional que não depende direitamente da árvore reativa do React. Funções para auxiliar cálculo de impostos, formatação de datas (como classes utilitárias ex: `utils.ts`) e configurações iniciais da API do backend. Todos entram em `lib/` ou `utils/`.

- 📁 **`src/pages/`**
  - Armazena as nossas Páginas principais/Rota inteira. Um arquivo dentro de páginas é a fusão, digamos, de um `Componente A (Navegação)` com dois componentes de `Formulário B` e gancho `useCarregarC`. Juntos se tornam uma view que o usuário acessa em uma URL como `/painel` ou `/login`.

- 📁 **`src/test/`**
  - Concentramos neste local funções essenciais para emular testes ou setup secundário de avaliação (Vitest/Playwright).

- 📄 **`App.tsx`** e **📄 `index.css`**
  - `App.tsx`: Contém na base os Provedores da Aplicação Global (Tema Claro/escuro, provedor de Alertas de Notificação base, entre outros) e em seguida monta o esquema do reator de rotas no layout que mapeamos.
  - `index.css`: Arquivo central para as injeções e declarações de variáveis CSS padrão que ditam o tema base sobreposto aos comandos do framework.
