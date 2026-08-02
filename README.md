[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org)
[![Quasar](https://img.shields.io/badge/Quasar-v2-1976D2?style=for-the-badge&logo=quasar)](https://quasar.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm)](https://pnpm.io)

# Smart Inventory Dashboard

Painel de gerenciamento de inventário construído com **Vue 3**, **Quasar** e **TypeScript**.

---

## 🚀 Sobre o Projeto

O **Smart Inventory Dashboard** é uma aplicação web para gestão de estoque: acompanhar
produtos, identificar itens com estoque baixo, visualizar indicadores em gráficos e
gerenciar o catálogo — tudo com autenticação e uma interface responsiva.

Os dados são consumidos da API pública [DummyJSON](https://dummyjson.com), o que torna o
projeto totalmente funcional para demonstração, sem depender de um back-end próprio.

### ✨ Funcionalidades

- **Autenticação** com token, rotas protegidas e sessão persistida no `localStorage`.
- **Dashboard interativo**: total de produtos, unidades em estoque, valor total do
  inventário, alerta de estoque crítico e gráfico de estoque por categoria.
- **Estoque baixo em destaque**: página dedicada com todos os produtos esgotados ou
  abaixo do limite configurado, além de indicador no menu e no cabeçalho.
- **Listagem de produtos** com busca, filtro por categoria e paginação.
- **Detalhe de produto** com galeria de imagens, avaliação, política de garantia/entrega.
- **Cadastro de produto** via formulário em modal.
- **Perfil** do usuário logado.
- **Configurações**: tema claro/escuro e limite de estoque baixo personalizável.
- **Tema escuro** persistido entre sessões.
- **Design responsivo**, pensado para desktop, tablet e mobile.
- Tela de **login com identidade visual própria** (imagem de fundo temática).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`),
  [Quasar Framework](https://quasar.dev/), [TypeScript](https://www.typescriptlang.org/),
  [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/),
  [ApexCharts](https://apexcharts.com/), [Axios](https://axios-http.com/)
- **Estilo:** [UnoCSS](https://unocss.dev/) para utilitários de layout, combinado com o
  sistema de temas do Quasar
- **Qualidade:** ESLint (flat config) + Prettier
- **Build:** [Vite](https://vitejs.dev/) via `@quasar/app-vite`
- **Gerenciador de pacotes:** [pnpm](https://pnpm.io/)

---

## 📂 Arquitetura do Projeto

O projeto segue uma separação clara de responsabilidades, priorizando código simples,
previsível e fácil de manter:

```
src/
├── boot/          # Inicialização de plugins (axios, apexcharts)
├── components/    # Componentes de UI reutilizáveis, organizados por contexto
├── composables/   # Regras de UI reutilizáveis (formatação, auth, estoque)
├── constants/      # Constantes compartilhadas (ex.: chaves de storage)
├── css/           # Estilos globais e variáveis de tema
├── interfaces/    # Tipos e contratos TypeScript
├── layouts/       # Layouts principais (autenticado / público)
├── pages/         # Páginas/rotas da aplicação
├── router/        # Configuração de rotas e guarda de autenticação
├── services/      # Camada de acesso à API (axios), sem lógica de UI
└── stores/        # Estado global com Pinia
```

**Princípios seguidos:**

- **Services** conhecem apenas HTTP — não sabem nada sobre Pinia ou componentes.
- **Stores** orquestram estado e chamam os *services*. `products` cuida da listagem
  paginada; `inventory` mantém a visão completa do catálogo (dashboard, estoque baixo,
  indicador do header); `settings` guarda tema e limite de estoque baixo; `auth` cuida
  da sessão.
- **Composables** expõem regras reutilizáveis (formatação de moeda, nível de estoque,
  sessão do usuário) para os componentes, evitando duplicação de lógica.
- **Componentes** ficam focados em apresentação, recebendo dados via props/composables.

---

## 🏁 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) (`^22.12`, `^24`, `^26` ou `^28`)
- [pnpm](https://pnpm.io/installation) (ou Yarn/NPM)

### Instalação

```bash
git clone https://github.com/viviankrieck/smart-inventory-dashboard.git
cd smart-inventory-dashboard
pnpm install
cp .env.example .env
```

### Executando a aplicação

```bash
pnpm dev
```

### Login de demonstração

A aplicação usa a autenticação da DummyJSON. Use qualquer usuário de teste listado em
[dummyjson.com/docs/auth](https://dummyjson.com/docs/auth) — por exemplo:

```
usuário: emilys
senha:   emilyspass
```

### Scripts disponíveis

| Comando         | Descrição                                     |
| --------------- | ---------------------------------------------- |
| `pnpm dev`      | Inicia o servidor de desenvolvimento           |
| `pnpm build`    | Compila a aplicação para produção              |
| `pnpm lint`     | Analisa o código em busca de erros             |
| `pnpm format`   | Formata os arquivos com o Prettier             |

---

## 🌐 Sobre os dados

Este projeto utiliza a API pública **[DummyJSON](https://dummyjson.com)** apenas para fins
de demonstração. Operações de criação/edição são aceitas pela API, mas não persistem entre
requisições — o foco do projeto é o front-end (arquitetura, UI e experiência de uso).

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

Feito com ❤️ por [Vivian Pereira](https://www.linkedin.com/)
