FROM node:alpine3.15

ENV NEXT_PUBLIC_API_KEY="wattanatawee_sk_c6b59475-e27f-46b8-b506-57bb41e67f85_82tcdyh0wq6fyfm8"
COPY . .

RUN yarn 

RUN yarn build

CMD ["yarn", "start"]