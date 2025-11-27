# Alquimia Template Typescript Kubernetes

Create a new k8s backend with Typescript

- [Initialize Template](#initialize-template)
- [Partials](#partials)

## Initialize Template

```bash
npm install -g @grupoboticario/scafflater-cli
scafflater-cli init git@github.com:grupoboticario/alquimia-template-typescript-k8s
```

## Partials

<!-- @scf-region partials-menu -->

[Framework Partials](#frameworks):

- Fastify
- Nestjs

[Services Partials](#services):

- DocumentDB
- DynamoDB
- MySql
- S3
- Sequelize
- SNS
- SQS

<!-- @end-scf-region -->

<!-- @scf-region partials -->

## Frameworks

```bash
USAGE
  $ scafflater-cli partial:run fastify|nestjs
OPTIONS
  -o, --output=output          [default: ./] The output folder
  -p, --parameters=parameters  [default: ] The parameters to init template

DESCRIPTION
  Creates a new Application layer using Fastify or NestJs in Typescript
```

## Services

```bash
USAGE
  $ scafflater-cli partial:run documentdb|dynamodb|memcached|redis|s3|sequelize|sns|sqs
OPTIONS
  -o, --output=output          [default: ./] The output folder
  -p, --parameters=parameters  [default: ] The parameters to init template

DESCRIPTION
  Creates a new specified service layer
```

<!-- @end-scf-region -->

---

> This template was generate using [Scafflater](https://github.com/scafflater/scafflater)
