# build
FROM node:20-slim AS builder
WORKDIR /app

RUN mkdir -p ./html5Deployer/resources/webapp

# Build and Prepare the app SAPUI5
COPY . .
# Delete Files
RUN rm -rf ./webapp/localService
RUN rm -rf ./webapp/test
RUN npm install
RUN npm install --global @ui5/cli
RUN ui5 build preload --clean-dest true --include-task=generateCachebusterInfo --dest ./html5Deployer/resources/webapp

# Prepara the HTML5 Deployer
COPY ./package*.json ./html5Deployer
COPY ./xs-app.json ./html5Deployer/resources/webapp

RUN cd ./html5Deployer && npm ci --only=production
RUN cd ./html5Deployer && npm prune --production

# Release the image HTML 5 Deployer
FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production
# Copy Build
COPY --from=builder /app/html5Deployer /app/

RUN npm install @sap/html5-app-deployer

# Prepare the deployment
RUN mkdir ./deploymentTemp
RUN chown -R node ./deploymentTemp
USER node

# run
CMD [ "node", "node_modules/@sap/html5-app-deployer/index.js"]