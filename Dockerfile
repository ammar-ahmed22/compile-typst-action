FROM node:20
# FROM ghcr.io/typst/typst:latest

COPY ./index.js /root/
COPY ./package*.json /root/

RUN npm install  

RUN ls
# FROM ghcr.io/typst/typst:latest 
ENTRYPOINT [ "node", "/root/index.js" ]