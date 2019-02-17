FROM node:8.15.0

RUN apt-get update

RUN npm install --global nodemon

COPY . /usr/src/app/server/

WORKDIR /usr/src/app/server

RUN rm -rf node_modules/

RUN npm install

EXPOSE 3000

CMD nodemon serve
