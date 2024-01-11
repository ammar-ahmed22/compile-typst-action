FROM node:20.0.0
# FROM ghcr.io/typst/typst:latest

COPY ./index.js ./
COPY ./package*.json ./

RUN ls
# RUN npm install 
# COPY . . 
# CMD ["node", "./index.js"]
# FROM ghcr.io/typst/typst:latest 
# CMD [ "node", "./index.js" ]