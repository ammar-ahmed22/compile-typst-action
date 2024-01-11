FROM node:14
# FROM ghcr.io/typst/typst:latest


COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

RUN npm install
RUN npm install -g typescript
RUN ls
RUN npm run build
RUN ls
COPY /dist/index.js /index.js
RUN ls

# RUN ["chmod", "+x", "index.js"]
# # FROM ghcr.io/typst/typst:latest
# RUN ls 
# ENTRYPOINT [ "node", "/index.js" ]