# Estrutura do Projeto - Dashboard de Suporte Técnico

Nossa organização de pastas foi desenhada para facilitar o entendimento e a manutenibilidade do código do **Painel Analítico de Gestão de Tickets**. Seguimos os padrões mais recomendáveis do mercado (ecossistema React/Vite) separando logicamente nossas camadas.

Abaixo você encontra um mapa atualizado das pastas e configurações do projeto. Dessa forma, garantimos que **qualquer um consiga entender o fluxo geral**.

## 💻 1. Raiz do Projeto (`/`)

A pasta raiz fica reservada apenas para configurações-chave, dependências e documentos essenciais. Nenhum código lógico de interface fica exposto aqui diretamente.

- 📁 **`public/`**: Pasta de assets brutos. Guardamos aqui a logomarca oficial (`Geração Caldeira`/`TechHelp`), o `favicon`, e imagens locais estáticas que não passam pelo processador de compilação do Vite.
- 📄 **`package.json`**: Nosso "RG" do projeto. Contém as dependências (React, Radix, Tailwind, etc.), scripts locais e **restrições de deploy** (como a exigência `"engines": { "node": ">=20.0.0" }` garantindo estabilidade na Vercel).
- 📄 **`package-lock.json`**: Árvore restrita e imutável das exatas versões de dependências NPM (nascido após a exclusão dos arquivos do `Bun` para evitar conflito na hospedagem).
- 📄 **`README.md`**: Descritivo geral do projeto reestruturado com instruções de execução nativa.
- 📄 **`relatorio.md`**: Registro log cronológico, as atualizações importantes, documentação de Deploy, horas e descrições das nossas alterações ágeis.
- 📄 **`framewor e linguagens.md`**: Qualificação detalhada da Tech Stack completa que suporta a aplicação (Vite, React, Tailwind, Shadcn/UI).
- 📄 **Arquivos de config de Infra (ex: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`)**: Configuram, respectivamente, como operam o build, as classes de estilo padrão e o rigor de linting no código.
- 📄 **Arquivos de E2E (ex: `playwright.config.ts`, `playwright-fixture.ts`)**: Configuração-base da ferramenta de automação e testes visuais/integração do sistema.

## 🗂️ 2. Coração da Aplicação (`src/`)

A pasta `/src` é onde de fato acontece nosso desenvolvimento contínuo em TypeScript/React. Cada subpasta tem seu propósito e não devem ser misturadas:

- 📁 **`src/components/`**
  - Aqui estão organizados os blocos construtores que geram uma interface. Interfaces compartilháveis de "Gestão de Tickets", botões, tabelas críticas (`CriticalTable`), e primitivas ricas (dentro de `/components/ui` montadas via Radix/Shadcn).
  
- 📁 **`src/data/`**
  - Dedicada a exportar informações tabuladas e arquivos estáticos (Mocks de JSON para os Tickets e Gráficos). Fundamental para prototipar a métrica limpa do Dashboard sem precisar levantar o backend de imediato.

- 📁 **`src/hooks/`**
  - Armazena comportamentos personalizados. Se tivermos ganchos customizados React para buscar listas de usuários do painel ou recalcular notificações de alertas de tickets em Dark Mode.

- 📁 **`src/lib/`**
  - Funções úteis e lógica computacional pura. Ex: classe utilitária de formatação de strings do Tailwind (`utils.ts`).

- 📁 **`src/pages/`**
  - Armazena as nossas visualizações completas (ex: `Index.tsx`). Representa união da Tela Inicial onde os Widgets de Casos Críticos, Header da Logomarca, e Painéis de Estatísticas se encontram em uníssono.

- 📁 **`src/test/`**
  - Reservatório interno para setups, extensões ou fixtures de suítes de teste como o Vitest.

- 📄 **`App.tsx`, `main.tsx` e `index.css`**
  - **`main.tsx` / `App.tsx`**: Pontos estritos de entrada da árvore do React. Acoplam provedores globais como o *TooltipProvider*, *BrowserRouter* e os alertas de notificação fluida (`Sonner`).
  - **`index.css`**: Arquivo central que estipula o pilar de estilização das variáveis CSS (como o `$background`, cores de superfície e `$foreground`), essenciais no controle nativo do *Dark Mode* que aplicamos na Tabela e nos dropdowns.
