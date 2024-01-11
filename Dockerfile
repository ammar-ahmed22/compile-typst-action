FROM node:lts
# FROM ghcr.io/typst/typst:latest


COPY package*.json ./

RUN npm ci

COPY index.js /inde.js

RUN ["chmod", "+x", "index.js"]
# FROM ghcr.io/typst/typst:latest
RUN ls 
ENTRYPOINT [ "node", "/index.js" ]