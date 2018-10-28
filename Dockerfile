FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i node-sass@4.9.4
RUN npm install

COPY . .

RUN npm run build

CMD npm run startNode