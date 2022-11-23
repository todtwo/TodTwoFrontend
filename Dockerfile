FROM node:alpine3.15


COPY . .

RUN npm install

RUN num run build

CMD ["npm", "run", "start"]