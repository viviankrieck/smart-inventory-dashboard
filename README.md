<div align="center">
  <img src="public/logos/logo-smart.svg" alt="Smart Inventory Logo" width="200"/>
  <h1>Smart Inventory Dashboard</h1>
  <p>Painel de gerenciamento de inventário construído com Vue 3, Quasar e TypeScript.</p>

![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)
![Quasar](https://img.shields.io/badge/Quasar-v2-1976D2?style=for-the-badge&logo=quasar)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm)

</div>

---

## 🚀 Sobre o Projeto

O **Smart Inventory Dashboard** é uma aplicação web moderna e responsiva para gerenciamento de inventário. Ele permite que os usuários monitorem produtos, visualizem dados de estoque em tempo real e gerenciem a autenticação de forma segura.

### ✨ Funcionalidades

- **Dashboard Interativo:** Visualização rápida do status do inventário, incluindo produtos com baixo estoque.
- **Autenticação:** Sistema de login seguro para proteger o acesso aos dados.
- **Design Responsivo:** Interface adaptável para desktops, tablets e dispositivos móveis, construída com o Quasar Framework.
- **Arquitetura Escalável:** Código organizado em componentes, páginas, stores (Pinia) e serviços para fácil manutenção e expansão.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Frontend:**
  - [Vue 3](https://vuejs.org/) (Composition API)
  - [Quasar Framework](https://quasar.dev/) (Componentes de UI, build, etc.)
  - [TypeScript](https://www.typescriptlang.org/) (Tipagem estática)
  - [Pinia](https://pinia.vuejs.org/) (Gerenciamento de estado)
  - [Vue Router](https://router.vuejs.org/) (Roteamento de páginas)
  - [ApexCharts](https://apexcharts.com/) (Gráficos e visualização de dados)
  - [UnoCSS](https://unocss.dev/) (Motor de CSS utilitário instantâneo)

- **Desenvolvimento:**
  - [Vite](https://vitejs.dev/) (Build tool)
  - [ESLint](https://eslint.org/) (Linting)
  - [Prettier](https://prettier.io/) (Formatação de código)
  - [pnpm](https://pnpm.io/) (Gerenciador de pacotes)

---

## 📂 Estrutura do Projeto

A estrutura de pastas do projeto segue as convenções do Quasar e Vue, organizada para escalabilidade:

```
src/
├── assets/       # Arquivos estáticos (imagens, fontes)
├── boot/         # Arquivos de inicialização do Quasar
├── components/   # Componentes Vue reutilizáveis
├── composables/  # Funções Vue Composables
├── css/          # Arquivos de estilo globais (SCSS)
├── interfaces/   # Definições de tipos e interfaces TypeScript
├── layouts/      # Componentes de layout principais
├── mocks/        # Mocks de dados para desenvolvimento
├── pages/        # Componentes de página (rotas)
├── router/       # Configuração do Vue Router
├── services/     # Lógica de negócio e comunicação com APIs
└── stores/       # Módulos de estado do Pinia
```

---

## 🏁 Começando

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versões `^22.12`, `^24`, `^26` ou `^28`)
- [pnpm](https://pnpm.io/installation) (ou Yarn/NPM)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/smart-inventory-dashboard.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd smart-inventory-dashboard
   ```
3. Instale as dependências:
   ```bash
   pnpm install
   ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento com hot-reload:

```bash
pnpm dev
```

### Scripts Disponíveis

- **Lint:** Analisa o código em busca de erros e inconsistências.
  ```bash
  pnpm lint
  ```
- **Format:** Formata todos os arquivos do projeto com o Prettier.
  ```bash
  pnpm format
  ```
- **Build:** Compila e otimiza a aplicação para produção.
  ```bash
  pnpm build
  ```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você tiver sugestões para melhorar este projeto, por favor, crie um fork do repositório e abra uma Pull Request.

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra uma Pull Request

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">
  Feito com ❤️ por Vivian Pereira
</div>
