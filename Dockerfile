# Установка зависимостей
FROM node:20.19.0-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Дев билд и запуск
FROM node:20.19.0-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Прод билд
FROM node:20.19.0-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_API_BASE
ARG VITE_CRYPTO_KEY
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_CRYPTO_KEY=$VITE_CRYPTO_KEY
RUN npm run build

# Прод запуск на веб-сервере nginx
FROM nginx:1.29.4-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
