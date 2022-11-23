FROM node:alpine3.15


COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]