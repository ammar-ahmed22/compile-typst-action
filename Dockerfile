
FROM node:14-alpine as node
# Typst Docker Image
FROM ghcr.io/typst/typst:latest
# Copying necessary files
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin
COPY package*.json ./
COPY tsconfig.json ./ 
COPY src ./src 

RUN node -v

# # Installing Nodejs
# RUN sudo apt-get update 
# RUN sudo apt-get -y install curl gnupg
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
# RUN sudo apt-get -y install nodejs 

# RUN apk add typst

# # Compiling typescript
# RUN npm install
# RUN npm install -g typescript

# RUN npm run build

# RUN ["chmod", "+x", "dist/index.js"]
# RUN ls 
# RUN cd dist && ls
# ENTRYPOINT [ "node", "/dist/index.js" ]