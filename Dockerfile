FROM node:16.17

WORKDIR /usr/src/app

COPY /package.json ./

RUN npm install

#COPY /client/package.json /app/client
COPY . .

RUN npm run client:install
RUN npm run client:build

EXPOSE 3099

VOLUME [ "/usr/src/app/data" ]

CMD [ "npm", "run", "start"  ]