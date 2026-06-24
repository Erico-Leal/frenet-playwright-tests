# Frenet Playwright Tests

Automação E2E do fluxo de cadastro público da Frenet usando Playwright.

Este projeto foi desenvolvido como parte de um desafio técnico de QA

## Instruções de execução

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=https://url-da-pagina-inicial
FREE_ACCOUNT_URL=https://url-da-pagina-de-conta-gratis
```

Rode todos os testes:

```bash
npx playwright test
```

Rode com o navegador aberto:

```bash
npx playwright test --headed
```

Abra o modo interativo do Playwright:

```bash
npx playwright test --ui
```

Rode apenas um arquivo de teste:

```bash
npx playwright test e2e/freeaccount.spec.ts
```

Abra o relatório:

```bash
npx playwright show-report
```

## Estrutura da automação

A automação foi separada em três partes principais:

- Specs: arquivos com os cenários de teste.
- Page Objects: classes com seletores e ações das páginas.
- Fixtures: massa de dados e modelos usados nos testes.

Essa separação evita repetir código nos testes e deixa os cenários mais fáceis de ler e manter.

## Organização do código

```text
e2e/
  homepage.spec.ts
  freeaccount.spec.ts
  fixtures/
    accounts.json
    registerModel.ts
    support/
      pages/
        homePage.ts
        freeAccount.ts
```

- `homepage.spec.ts`: testes do fluxo pela página inicial.
- `freeaccount.spec.ts`: testes do fluxo direto de conta grátis.
- `homePage.ts`: Page Object da página inicial.
- `freeAccount.ts`: Page Object da página de conta grátis.
- `accounts.json`: massa de dados usada nos testes.
- `registerModel.ts`: modelo dos dados de cadastro.

## Decisões tomadas

Neste projeto, utilizei Playwright para automatizar testes E2E, aplicando boas práticas de organização, manutenção e confiabilidade dos testes. Estruturei o código com Page Objects, separei massas de dados em fixtures/JSON, utilizei variáveis de ambiente com dotenv e configurei a execução em múltiplos navegadores, como Chromium, Firefox e WebKit.

Também criei métodos reutilizáveis para ações comuns da aplicação, trabalhei com seletores mais específicos para reduzir instabilidades e validei comportamentos importantes da interface, como redirecionamentos, interação com botões, exibição de elementos e tratamento do banner de cookies. A estrutura foi pensada para facilitar a manutenção, a execução local e uma futura integração com pipeline de CI/CD.

Durante o desenvolvimento da automação, percebi que o reCAPTCHA não conseguia ser acionado corretamente pelo teste automatizado devido aos mecanismos antiBot da aplicação. Como a proposta do projeto não é burlar esse tipo de proteção, mantive essa limitação documentada.

Mesmo assim, implementei os métodos responsáveis por clicar no reCAPTCHA e no botão de criação de conta, deixando o fluxo preparado para um ambiente de testes controlado, onde o captcha possa ser tratado por uma estratégia oficial, como chave de teste, bypass controlado ou desativação em homologação.

## Limitações e possíveis melhorias

- O fluxo possui reCAPTCHA, que não deve ser burlado em automações E2E reais.
- Para um ambiente de testes, o ideal seria ter uma chave de teste, um bypass controlado ou uma versão do fluxo sem captcha.
- Os testes atualmente preenchem o formulário, mas o clique final de criação pode depender da estratégia adotada para o reCAPTCHA.
- Uma melhoria futura seria gerar dados dinâmicos para evitar conflito com usuários já cadastrados.
- Também seria interessante adicionar scripts no `package.json` para simplificar os comandos de execução.

## Observações

- Evite usar dados reais ou sensíveis na massa de testes.
- O relatório HTML do Playwright pode ser usado como evidência da execução.
