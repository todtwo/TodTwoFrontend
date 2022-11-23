FROM node:alpine3.15


COPY . .

RUN yarn 

RUN yarn build

CMD ["yarn", "start"]