FROM node:20
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src/
COPY tsconfig.json ./
COPY template.data.sqlite ./data.sqlite

EXPOSE 3000

CMD ["npm", "run", "dev"]
