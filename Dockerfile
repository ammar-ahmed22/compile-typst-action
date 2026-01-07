
FROM node:23-alpine as node
# Typst Docker Image
FROM ghcr.io/typst/typst:latest

# Copying NodeJS installation
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

WORKDIR /usr/app/

# Copying necessary files
COPY package*.json /usr/app/
COPY tsconfig.json /usr/app/
COPY src /usr/app/src

# Compiling typescript
RUN npm install -g typescript
RUN npm install

RUN npm run build

ENTRYPOINT [ "node", "/usr/app/dist/index.js" ]
