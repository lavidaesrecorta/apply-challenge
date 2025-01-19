FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

CMD [ "yarn", "start:dev" ]
