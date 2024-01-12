
FROM node:14-alpine as node
# Typst Docker Image
FROM ghcr.io/typst/typst:latest

# Copying NodeJS installation
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

# Copying necessary files
COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

# Compiling typescript
RUN npm install
RUN npm install -g typescript

RUN npm run build
COPY . .
RUN ["chmod", "+x", "dist/index.js"]
RUN ls 
RUN cd dist && ls
ENTRYPOINT [ "node", "dist/index.js" ]