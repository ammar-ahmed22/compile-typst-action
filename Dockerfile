FROM node:lts
# FROM ghcr.io/typst/typst:latest


COPY package*.json ./
COPY tsconfig.json ./ 

RUN npm ci
RUN ls
# RUN npm run build
# RUN ls
# COPY /dist/index.js /index.js

# RUN ["chmod", "+x", "index.js"]
# # FROM ghcr.io/typst/typst:latest
# RUN ls 
# ENTRYPOINT [ "node", "/index.js" ]