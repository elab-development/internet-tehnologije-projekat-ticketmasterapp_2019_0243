FROM node:14

WORKDIR /tickets-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000