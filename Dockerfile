FROM node:16.17

WORKDIR /app

COPY /package.json /app

RUN npm install

#COPY /client/package.json /app/client
COPY . .

RUN npm run client:install
RUN npm run client:build

EXPOSE 3099

VOLUME [ "/app/data" ]

CMD [ "npm", "run", "start"  ]