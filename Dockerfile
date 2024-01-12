FROM ghcr.io/typst/typst:latest

COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

RUN apk add --update nodejs nodejs-npm
RUN npm install
RUN npm install -g typescript

RUN npm run build

RUN ["chmod", "+x", "dist/index.js"]
RUN ls 
RUN cd dist && ls
ENTRYPOINT [ "node", "/dist/index.js" ]