FROM node:10.4.1

RUN npm -v

RUN npm install yarn -g -q

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "start"]
