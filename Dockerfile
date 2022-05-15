FROM node:16

WORKDIR /simple-web-server

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]