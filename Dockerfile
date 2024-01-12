FROM node:14 as builder

COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

RUN npm install
RUN npm install -g typescript

RUN npm run build

FROM ghcr.io/typst/typst:latest
COPY --from=builder . .
RUN apk add --update nodejs
RUN ["chmod", "+x", "dist/index.js"]
RUN ls 
RUN cd dist && ls
ENTRYPOINT [ "node", "/dist/index.js" ]