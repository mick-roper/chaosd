FROM node:10-alpine

WORKDIR /app

COPY ./src /app
COPY ./node_modules /app/node_modules

RUN ls /app

CMD ["node", "index.js"]