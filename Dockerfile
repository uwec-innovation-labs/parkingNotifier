FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g  nodemon

COPY . .

EXPOSE 9000

CMD [ "npm", "run", "dev"]