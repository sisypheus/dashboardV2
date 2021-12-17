FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8084

EXPOSE 8084

CMD ["node", "index.js"]