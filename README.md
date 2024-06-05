# Beach Tennis Student Management API

API para gerenciamento de alunos de beach tennis.

## Descrição

Este projeto é uma API RESTful desenvolvida com [NestJS](https://nestjs.com/) e [TypeORM](https://typeorm.io/) para gerenciar alunos de beach tennis. Ele fornece endpoints para criar, atualizar, visualizar e excluir informações de alunos, bem como autenticação de usuário.

## Como iniciar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Navegue até o diretório do projeto:

```bash
cd nome-do-repositorio
```

3. Instale as dependências:

```bash
yarn install
```

### Configuração do banco de dados

Este projeto utiliza o Docker Compose para criar um contêiner do MySQL. Certifique-se de que o Docker esteja em execução e execute o seguinte comando:

```bash
docker-compose up -d
```

### Execução do projeto

Após a configuração do banco de dados, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
yarn start
```

Isso iniciará o servidor na porta padrão 3000.

### Documentação da API

Você pode acessar a documentação da API no endpoint `/docs` após iniciar o servidor. Por exemplo:

[http://localhost:3000/docs](http://localhost:3000/docs)

## Funcionalidades Principais

- **Autenticação de Usuário**: O usuário pode se autenticar na API para acessar recursos protegidos.
- **Gerenciamento de Alunos**: CRUD completo para gerenciar informações de alunos de beach tennis.
- **Documentação Swagger**: Documentação interativa da API disponível em `/docs`.

## Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request para discutir as alterações que você gostaria de fazer.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

Sinta-se à vontade para personalizar este README.md de acordo com as necessidades específicas do seu projeto.