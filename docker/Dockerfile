FROM node:9-alpine

# install bash
RUN apk add --no-cache bash gawk sed grep bc coreutils

WORKDIR /home

RUN npm i -g truffle

ENTRYPOINT "/bin/sh"