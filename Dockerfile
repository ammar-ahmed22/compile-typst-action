
FROM node:14-alpine as node
# Typst Docker Image
FROM ghcr.io/typst/typst:latest

# Copying NodeJS installation
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

# Copying necessary files
COPY package*.json /root/
COPY tsconfig.json /root/
COPY src /root/src 

# Compiling typescript
RUN npm install
RUN npm install -g typescript

RUN npm run build

# # This Works!!
# RUN mkdir repo
# COPY . /root/repo

# ENTRYPOINT [ "node", "/root/dist/index.js" ]
COPY /root/dist/index.js index.js
ENTRYPOINT ["node", "index.js"]