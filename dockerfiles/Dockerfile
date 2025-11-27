FROM 414700354900.dkr.ecr.us-east-1.amazonaws.com/base/golden-image/node:22-alpine AS builder

USER root

WORKDIR /app

ENV NODE_ENV=build

COPY . ./

RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env=NODE_AUTH_TOKEN \
  echo "@grupoboticario:registry=https://npm.pkg.github.com/" > ./.npmrc && \
  echo "//npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN" >> ./.npmrc && \
  npm ci
RUN npm run build
RUN npm prune --production

RUN rm -f .npmrc

FROM 414700354900.dkr.ecr.us-east-1.amazonaws.com/base/golden-image/node:22-alpine

WORKDIR /app

ENV AWS_NODEJS_CONNECTION_REUSE_ENABLED=1
ENV NODE_ENV=production

COPY --from=builder /app/dist /app/
COPY --from=builder /app/node_modules /app/node_modules

USER userapp

EXPOSE 3000

CMD ["node", "src/index.js"]
