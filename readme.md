# Playwright Automations




Este repositório contém automações de teste utilizando Playwright e TypeScript. O objetivo é fornecer exemplos e uma estrutura para a criação de testes automatizados de ponta a ponta.

## Tecnologias

*   [Playwright](https://playwright.dev/) - Framework de automação para testes end-to-end.
*   [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação para desenvolvimento.
*   [pnpm](https://pnpm.io/) - Gerenciador de pacotes rápido e eficiente.




## Como Começar

Para configurar e executar os testes neste repositório, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [pnpm](https://pnpm.io/installation) instalados em sua máquina.

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/healthcare-ti/playwright-automations.git
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd playwright-automations
    ```

3.  Instale as dependências:

    ```bash
    pnpm install
    ```

### Executando os Testes

Para executar todos os testes:

```bash
pnpm playwright test
```

Para executar testes em um navegador específico (ex: Chromium):

```bash
pnpm playwright test --project=chromium
```

Para abrir o UI Mode do Playwright:

```bash
pnpm playwright test --ui
```



