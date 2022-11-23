FROM node:alpine3.15


COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]