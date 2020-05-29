FROM node:12.16.3 AS builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY src ./src
COPY public ./public
ENV REACT_APP_API_URL ""
RUN npm run build

FROM nginx:1.18.0-alpine
WORKDIR /workdir
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]