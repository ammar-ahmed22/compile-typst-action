FROM node:14 as builder
# FROM ghcr.io/typst/typst:latest


COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

RUN npm install
RUN npm install -g typescript
RUN ls
RUN npm run build
RUN cd dist && ls
# COPY /dist/index.js /index.js
# RUN ls

RUN ["chmod", "+x", "dist/index.js"]

FROM ghcr.io/typst/typst:latest
COPY --from=builder . .
# RUN ls 
ENTRYPOINT [ "node", "/dist/index.js" ]