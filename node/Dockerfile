FROM node:12.16.3 AS builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY *.json ./
COPY src ./src
RUN npm run build

FROM node:12.16.3-alpine AS production
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY *.json ./
RUN npm install --production
CMD ["npm", "start"]