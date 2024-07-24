FROM node:18-alpine
RUN apk add --no-cache bash
WORKDIR /app

COPY package*.json ./
RUN npm install

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

RUN npm install -g nodemon

COPY . .

CMD ["npm", "run", "start"]
