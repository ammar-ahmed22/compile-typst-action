FROM node:20
# FROM ghcr.io/typst/typst:latest

COPY ./index.js ./
COPY ./package*.json ./

RUN npm install 
COPY . . 

RUN ls
# FROM ghcr.io/typst/typst:latest 
ENTRYPOINT [ "node", "./index.js" ]