FROM node:alpine

WORKDIR /client

COPY ./package.json /client
COPY ./package-lock.json /client

RUN npm i

COPY . /client

CMD ["npm", "start"]