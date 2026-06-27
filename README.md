# Frenet Playwright Tests

Automação End to End do fluxo de cadastro público da Frenet usando Playwright.

## Instruções de execução

Para Instalar as dependências utilize:

```bash
npm ci
```

Para Instalar os navegadores do Playwright utilize:

```bash
npx playwright install
```

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=https://url-da-pagina-inicial
FREE_ACCOUNT_URL=https://url-da-pagina-de-conta-gratis
```

Para rodar todos os testes Utilize:

```bash
npx playwright test
```

Para rodar com os navegadores abertos utilize:

```bash
npx playwright test --headed
```

Para Abrir o modo interativo do Playwright:

```bash
npx playwright test --ui
```

Para abrir o relatório de testes:

```bash
npx playwright show-report
```

## Estrutura da automação de testes

A estrutura do projeto foi separada em três partes principais:

- Specs: onde ficam os arquivos com os cenários de teste.
- Page Objects: onde criei classes com seletores e ações das páginas para deixar o codigo mais limpo.
- Fixtures: onde deixei a massa de dados e modelos usados nos testes.

Separei desta forma pois facilita a manutencão e deixa mais facil de se ler o código, facilita o processo de adicionar
uma nova funcão ou novos testes.

## Decisões que tomei

Decidi adotar uma Estrutura de código com Page Objects, para melhorar a organizacão e manutencão do projeto, separei massas de dados em um JSON localizado nas fixtures, utilizei o dotenv para setar as URLS do projeto deixando-o mais limpo e organizado, e habilitei os testes multi Browsers

Támbem decidi criar metodos para ter uma melhor reutilizacão do código para acões comuns, Como Ir até a pagina, localizar botões e espacõs de input do usuario, utilizei seletores mais objetivos para reduzir erros e validei comportamentos da interface, como redirecionamento, interacão com botões, e testando exibicão de elementos como o Banner de cokies e o botão de "Aceitar"

Durante o desenvolvimento dos page Object, percebi que o ReCaptcha não conseguia ser acionado corretamente pelo teste da automatizao devido aos mecanismos antiBot do Site. Como a proposta do proposta do projeto, e automatizar o cadastro de contas, resolvi não tentar burlar o ReCaptcha

Como o ReCaptcha não deixa seguir para os proximos passos como clicar no botão de criação de conta, então decidir ir até onde a página no estado atual me permite, porem deixei o projeto preparado como as funcões de clickar e validar o ReCaptcha e clicar em criar uma nova conta, por enquanto o teste vai até o preenchimento do formulario por conta das limitacões uma ideia de melhoria seria uma chave de teste, bypass controlado ou desativação do ReCaptcha no ambiente de testes.

## Limitações e possíveis melhorias

- O fluxo possui um ReCaptcha, O tal qual não preferi burlar.
- Seria bom futuramente ter uma chave de teste, um bypass controlado ou uma versão do fluxo sem ReCaptcha para facilitar a automacão.
- Os testes estão apenas preenchendo o formulário de criar uma nova conta.
- Funcões como clickar na checkBox do ReCaptcha e criar uma nova conta estão comentados pelo motivo do ReCaptcha, porem funcionam perfeitamente
- Uma melhoria futura será implementar metodos de criar dados dinámicos para melhorar a escalabilidade dos testes e previnir conflitos ente usuarios da massa de teste.

## Melhorias
- Observei nas limitacões e possiveis melhorias que utilizar dados dinamicos seria um grande passo de melhoria para o projeto, então implementei metodos para gerar dados dinamicos utilizando o Faker 
- os testes agora validam os campos de input para confirmar se foram preenchidos antes de continuar para o proximo passo.
- implementei uma validação de telefone, onde removo a máscara de telefone do site, e após remover a mascara validacão compara os campos e confirma os dados,
- fiz os dados dinâmicos retornarem um "RegisterUserModel". assim posso validar os dados mesmo eles sendo gerados dinâmicamente.
- melhorei a organização dos PageObject e a logica dos mesmos.
- Workflow agora foi atualizado para utilizar o node 24.