FROM node:9-alpine

# install bash
RUN apk add --no-cache bash gawk sed grep bc coreutils

WORKDIR /home

RUN npm i -g truffle@4.1.7 solium@1.1.6

ENTRYPOINT "/bin/sh"