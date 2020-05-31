FROM node:12.16.3 AS builder
WORKDIR /app
COPY package* ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:12.16.3-alpine AS production
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.* ./
ENV TYPEORM_CONNECTION mariadb
ENV TYPEORM_PORT 3306
ENV TYPEORM_SYNCHRONIZE true
ENV TYPEORM_LOGGING false
ENV TYPEORM_ENTITIES dist/entity/**/*.js
ENV TYPEORM_MIGRATIONS dist/migration/**/*.js
ENV TYPEORM_SUBSCRIBERS dist/subscriber/**/*.js
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start"]