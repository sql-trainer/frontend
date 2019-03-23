FROM node:alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install --loglevel=error

CMD CHOKIDAR_USEPOLLING=true npm start --loglevel=error