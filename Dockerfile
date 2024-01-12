# Typst Docker Image
FROM ghcr.io/typst/typst:latest

# Copying necessary files
COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

# Installing Nodejs
RUN apt-get update 
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs 

# Compiling typescript
RUN npm install
RUN npm install -g typescript

RUN npm run build

RUN ["chmod", "+x", "dist/index.js"]
RUN ls 
RUN cd dist && ls
ENTRYPOINT [ "node", "/dist/index.js" ]