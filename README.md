# Sd Material Nbs V2 App

Mapeamento Material x NBS (Reforma tributária)

## Environments

| Environment | URL                                                                |
| ----------- | ------------------------------------------------------------------ |
| dev         | <https://sd-material-nbs-v2-app.dev.btp.app.grupoboticario.com.br> |
| prd         | <https://sd-material-nbs-v2-app.prd.btp.app.grupoboticario.com.br> |

## Guia de referência de API RESTful

Este é o guia de API RESTful do Grupo Boticário que define os padrões a serem adotados durante a implementação de novas APIs públicas ou privadas no GB, tornando os serviços acessíveis através de interfaces que são facilmente compreendidas e documentadas para desenvolvedores e consumidores.

[Clique aqui para acessar o guia](https://alquimia.gb.tech/docs/default/component/api-restful)

## Começando

Executando o aplicativo:

Copie o arquivo env para desenvolvimento local

```bash
cp .env{.example,}
```

```bash
npm ci
npm run start:dev
```

Testando

```bash
curl http://localhost:3000/healthcheck
curl http://localhost:3000/healthcheck/complete
curl http://localhost:3000
```
