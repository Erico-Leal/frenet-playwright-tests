# Frenet Playwright Tests

Automação E2E do fluxo de cadastro público da Frenet usando Playwright.

Este projeto foi desenvolvido como parte de um desafio técnico de QA

## Instruções de execução

Instale as dependências:

npm install


Instale os navegadores do Playwright:

npx playwright install


Crie um arquivo .env na raiz do projeto:

BASE_URL=https://url-da-pagina-inicial

FREE_ACCOUNT_URL=https://url-da-pagina-de-conta-gratis


Para rodar todos os testes Utilize:

npx playwright test


Rode com o navegador aberto:

npx playwright test --headed


Abra o modo interativo do Playwright:

npx playwright test --ui
```

Rode apenas um arquivo de teste:

```bash
npx playwright test e2e/freeaccount.spec.ts
```

Abra o relatório:

```bash
npx playwright show-report

## Estrutura da automação de testes

A estrutura do projeto foi separada em três partes principais:

- Specs: onde ficam os arquivos com os cenários de teste.
- Page Objects: onde criei classes com seletores e ações das páginas para deixar o codigo mais limpo.
- Fixtures: onde deixei a massa de dados e modelos usados nos testes.

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

Durante o desenvolvimento dos page Object, percebi que o Captcha não conseguia ser acionado corretamente pelo teste da automatizao devido aos mecanismos antiBot do Site. Como a proposta do proposta do projeto, e automatizar o cadastro de contas, resolvi não tentar burlar o captcha

Como o captcha não deixa seguir para os proximos passos como clicar no botão de criação de conta, então decidir ir até onde a página no estado atual me permite, porem deixei o projeto preparado como as funcões de clickar e validar o captcha e clicar em criar uma nova conta, por enquanto o teste vai até o preenchimento do formulario por conta das limitacões uma ideia de melhoria seria uma chave de teste, bypass controlado ou desativação do captcha no ambiente de testes.

## Limitações e possíveis melhorias

- O fluxo possui reCAPTCHA, que não deve ser burlado em automações E2E reais.
- Para um ambiente de testes, o ideal seria ter uma chave de teste, um bypass controlado ou uma versão do fluxo sem captcha.
- Os testes atualmente preenchem o formulário, mas o clique final de criação pode depender da estratégia adotada para o reCAPTCHA.
- Uma melhoria futura seria gerar dados dinâmicos para evitar conflito com usuários já cadastrados.
- Também seria interessante adicionar scripts no `package.json` para simplificar os comandos de execução.

## Observações

- Evite usar dados reais ou sensíveis na massa de testes.
- O relatório HTML do Playwright pode ser usado como evidência da execução.
