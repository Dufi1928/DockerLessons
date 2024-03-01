FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm install
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
