FROM node:18-alpine
RUN apk add --no-cache bash
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

CMD ["npm", "run", "start:dev"]
