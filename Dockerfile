FROM node:16.17

WORKDIR /app

COPY . .

RUN npm install
RUN npm run client:install
RUN npm run client:build

EXPOSE 3099

CMD [ "npm", "run", "start"  ]