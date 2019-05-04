FROM keymetrics/pm2:latest-stretch

RUN apt-get update && apt-get -y install python3

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn", "run", "start:dev"]
