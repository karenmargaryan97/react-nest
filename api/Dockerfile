FROM node:alpine

ENV NODE_ENV development

WORKDIR /api

COPY ./package.json /api
COPY ./package-lock.json /api

RUN npm i

COPY . /api

CMD ["npm", "run", "start:dev"]