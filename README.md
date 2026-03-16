# Techsolve Insights (TESTE)

Bem-vindo ao repositório do **Techsolve Insights**. Este projeto é uma aplicação web moderna, desenhada para ser rápida, escalável e de fácil manutenção, construída com as melhores práticas do ecossistema React, Vite e TypeScript.

## 📚 Documentação do Projeto

Para garantir que qualquer pessoa, seja um novo desenvolvedor ou gestor, entenda perfeitamente a arquitetura, a organização e o andamento do projeto, separamos a documentação em arquivos específicos e bem organizados:

- 🏗️ [**Estrutura do Projeto**](./ESTRUTURA_DO_PROJETO.md): Explicação detalhada sobre a organização das pastas e onde cada parte do código (componentes, páginas, hooks) deve ser alocada. **Leitura recomendada para entender a arquitetura.**
- 💻 [**Frameworks e Linguagens**](./framewor%20e%20linguagens.md): Lista completa de todas as tecnologias, bibliotecas e versões empregadas na base deste projeto.
- 📅 [**Relatório de Atualizações**](./relatorio.md): Log cronológico detalhando as alterações, novas implementações, correções e decisões tomadas ao longo do desenvolvimento.

## 🚀 Como rodar o projeto localmente

Para executar este projeto em sua máquina, certifique-se de ter o [Node.js](https://nodejs.org/) (recomendamos a versão LTS) ou o [Bun](https://bun.sh/) instalados.

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Acesse a pasta do projeto
cd techsolve-insights-TESTE

# 3. Instale as dependências
npm install
# ou utilizando Bun: bun install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou utilizando Bun: bun dev
```

O servidor iniciará, geralmente, no endereço `http://localhost:8080` (verifique o terminal para o link exato).

## 🛠 Scripts Disponíveis

No diretório principal do projeto, você pode gerenciar a aplicação executando os seguintes comandos:

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia a aplicação em modo de desenvolvimento com hot-reloading. |
| `npm run build` | Processa e empacota a aplicação gerando a versão otimizada para produção. |
| `npm run lint` | Roda o ESLint para analisar o código e encontrar/corrigir problemas de padronização. |
| `npm run test` | Executa a suíte de testes automatizados utilizando o Vitest. |
| `npm run preview` | Inicia um servidor web local e simples para simular e visualizar a build compilada de produção. |

## ✨ Tecnologias e Ecossistema

Esta aplicação tira proveito de um conjunto moderno de ferramentas. Para a lista completa e seus propósitos, visite o nosso documento de [Frameworks e Linguagens](./framewor%20e%20linguagens.md).

**Principais:**
- **[Vite](https://vitejs.dev/)** + **[React](https://reactjs.org/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)** (Estilização ágil)
- **[shadcn/ui](https://ui.shadcn.com/)** (Componentes de UI acessíveis)
- **[Zod](https://zod.dev/)** + **[React Hook Form](https://react-hook-form.com/)** (Validações e formulários)

---
*Documentação criada e mantida para facilitar a manutenção, garantir a organização e apoiar o crescimento contínuo do sistema.*
