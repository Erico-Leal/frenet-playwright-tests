# Frenet Playwright Tests

Automação End to End do fluxo de cadastro da Página da Frenet usando Playwright.

## Instruções de execução

Instalar as dependências Utilizando:

npm install

Instalar os navegadores do Playwright:

npx playwright install

Crie um arquivo .env na raiz do projeto:

BASE_URL=https://url-da-pagina-inicial
FREE_ACCOUNT_URL=https://url-da-pagina-de-conta-gratis

Para rodar todos os testes:

npx playwright test

Para rodar com os navegadores abertos:

npx playwright test --headed

Para Abrir o modo interativo do Playwright:

npx playwright test --ui

Para abrir o relatório de testes:

npx playwright show-report

## Estrutura da automação de testes

A estrutura do projeto foi separada em três partes principais:

- Specs: onde ficam os arquivos com os cenários de teste.
- Page Objects: onde criei classes com seletores e ações das páginas para deixar o codigo mais limpo.
- Fixtures: onde deixei a massa de dados e modelos usados nos testes.

Separei desta forma pois facilita a manutencão e deixa mais facil de se ler o código, facilita o processo de adicionar
uma nova funcão ou novos testes.

## Decisões que tomei

Utilizei uma Estrutura de código com Page Objects, para melhorar a organizacão e manutencão do projeto, separei massas de dados em um JSON localizado nas fixtures, támbem utilizei o dotenv para setar as URLS do projeto deixando-o mais limpo e organizado, e habilitei os testes multi Browsers

Támbem decidi criar metodos para ter uma melhor reutilizacão do código para acões comuns, Como Ir até a pagina, localizar botões e espacõs de input do usuario, utilizei seletores mais objetivos para reduzir erros e validei comportamentos da interface, como redirecionamento, interacão com botões, e testando exibicão de elementos como o Banner de cokies e o botão de "Aceitar"

Durante o desenvolvimento dos page Object, percebi que o Captcha não conseguia ser acionado corretamente pelo teste da automatizao devido aos mecanismos antiBot do Site. Como a proposta do proposta do projeto, e automatizar o cadastro de contas, resolvi não tentar burlar o captcha

Como o captcha não deixa seguir para os proximos passos como clicar no botão de criação de conta, então decidir ir até onde a página no estado atual me permite, porem deixei o projeto preparado como as funcões de clickar e validar o captcha e clicar em criar uma nova conta, por enquanto o teste vai até o preenchimento do formulario por conta das limitacões uma ideia de melhoria seria uma chave de teste, bypass controlado ou desativação do captcha no ambiente de testes.

## Limitações e possíveis melhorias

- O fluxo possui um Captcha, O tal qual não preferi burlar.
- Seria bom futuramente ter uma chave de teste, um bypass controlado ou uma versão do fluxo sem captcha para facilitar a automacão.
- Os testes estão apenas preenchendo o formulário de criar uma nova conta.
- Funcões como clickar na checkBox do captcha e criar uma nova conta estão comentados pelo motivo do captcha, porem funcionam perfeitamente
- Uma melhoria futura será implementar metodos de criar dados dinámicos para melhorar a escalabilidade dos testes e previnir conflitos ente usuarios da massa de teste.