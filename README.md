# Beach Tennis Student Management API

## Descrição

Este sistema foi desenvolvido para facilitar o gerenciamento de atividades relacionadas ao ensino de beach tennis. Possui as seguintes funcionalidades:

- **Cadastro de Usuários:** O perfil do usuário é criado no sistema com seus dados de email, nome, entre outros dados. Cada usuário possui seu tipo (aluno ou professor).
- **Cadastro de Alunos:** Professores podem cadastrar e gerenciar seus alunos.
- **Listagem de Alunos:** Professores têm acesso à listagem completa de seus alunos para fácil consulta e gerenciamento.
- **Cadastro de Turmas:** Professores podem criar e gerenciar turmas de beach tennis, associando alunos e configurando horários de aula.
- **Login:** Tanto professores quanto alunos podem acessar o sistema de forma segura com suas credenciais.
- **Listagem de Turmas:** Professores e alunos podem visualizar as turmas disponíveis, com detalhes sobre horários e participantes.
- **Gestão e realização de Pagamentos:** Professores podem gerenciar os pagamentos dos alunos, monitorando o status e organizando as pendências financeiras. Os pagamentos ficam disponíveis para alunos e professores acompanharem.

Este projeto é uma API RESTful desenvolvida com [NestJS](https://nestjs.com/) e [TypeORM](https://typeorm.io/) 

**Frontend**: [Beach Tennis Student Manager Frontend](https://github.com/LuizAbudi/beach-tennis-student-manager-frontend)

## Como iniciar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

1. Instale as dependências:

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

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---
