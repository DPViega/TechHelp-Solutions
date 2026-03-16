# Frameworks e Linguagens

Neste documento, listamos as principais tecnologias, linguagens e frameworks utilizados neste projeto, permitindo que qualquer desenvolvedor tenha uma visão geral da arquitetura do sistema.

## 💻 Linguagens
- **TypeScript (v5.8.3)**: Usado como linguagem principal em todo o projeto, garantindo tipagem estática e segurança.
- **JavaScript**: Usado em arquivos de configuração secundários (como Tailwind, ESLint e PostCSS).
- **HTML5 & CSS3**: Para estruturação e estilização global.

## 🏗️ Frameworks e Bibliotecas Principais
- **React (v18.3.1)**: Biblioteca de interface de usuário.
- **Vite (v5.4.19)**: Ferramenta de build super rápida e servidor de desenvolvimento.
- **Tailwind CSS (v3.4.17)**: Framework de CSS utilitário para estilização ágil e padronizada.

## 🧩 Componentes e UI (Interface do Usuário)
- **Radix UI**: Usado como base primitiva e acessível para a construção de muitos dos nossos componentes visuais (via shadcn/ui).
- **Lucide React**: Biblioteca para a utilização de ícones otimizados.
- **Framer Motion**: Utilizado para animações complexas e fluidas na interface.
- **Recharts**: Biblioteca responsiva baseada em React e D3 para criação de gráficos analíticos.
- **Embla Carousel React**: Usado na criação ágil de carrosseis e exibições em grade de rolagem pela tela.
- **Sonner**: Gerenciador moderno de notificações e toasts (alertas na tela).

## ⚙️ Gerenciamento de Estado, Rotas e Formulários
- **React Router DOM**: Para mapeamento das páginas pela URL e gerenciamento de navegação sem recarregar (SPA).
- **TanStack React Query**: Biblioteca poderosa para requisições assíncronas (fetching), cacheamento e sincronização de dados remotos no frontend.
- **React Hook Form**: Manipulação dos formulários de forma eficiente, ágil e tipada.
- **Zod**: Biblioteca para validação de esquemas e formatos de dados de formulário.

## 🧪 Qualidade de Código e Testes
- **ESLint & TypeScript-ESLint**: Análise estática do código; garante padronização e boas práticas na escrita.
- **Vitest**: Framework de testes unitários movido a Vite, incrivelmente eficiente para teste do React e utils globais.
- **Playwright**: Framework completo para testes automatizados ponta-a-ponta (E2E), simulando ações de usuário pelo navegador.
- **Testing Library (@testing-library/react)**: Ferramentas auxiliares que ajudam na renderização e inspeção do comportamento dos componentes React nos testes virtuais.

## 📦 Gerenciador de Pacotes e Runtime
- **Node.js**: Plataforma global base de execução do projeto inteiro.
- **Bun**: Gerenciador hiper-rápido de dependências e runtime local, evidenciado pelos arquivos padrão `.lock` no nosso diretório.
