## Description

Nest framework TypeScript Template.

## Installation

```bash
$ npm install
```

## Development Database

Database connection is setup to use environment variables in a `.env` file.
The Database connection is setup to use `MySQL` with `typeorm` packages.
A `.env.example` is provided that uses database and initial data variables for the following setup:
Development database creation using `template` with user `template` at `localhost:3306`:

> **Note:** Please make sure you have installed mysql and have configured your environment to use it.

```sql
CREATE DATABASE template;
```

```sql
CREATE USER 'CREATE DATABASE template'@'localhost' IDENTIFIED BY 'CREATE DATABASE template';
```

```sql
GRANT ALL PRIVILEGES ON *.* TO 'template'@'localhost' WITH GRANT OPTION;
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs

- [Nest](https://docs.nestjs.com/) - Documentation for Nest framework.
- [MySQL](https://www.mysql.com/products/community/) - Documentation for MySQL Community Server.
