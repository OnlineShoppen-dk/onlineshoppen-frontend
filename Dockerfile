FROM node:18-alpine

WORKDIR /app


COPY package.json .
RUN npm install

COPY . .

ENV NODE_ENV=development

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "preview", "--watch"]
