FROM node:alpine

WORKDIR /app

COPY . /app/

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

RUN yarn build

EXPOSE 4173