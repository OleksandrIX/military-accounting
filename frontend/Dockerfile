# Використовуємо базовий образ Node.js з веб-сервером
FROM node:14-alpine as build

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо файли package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі інші файли проекту
COPY . .

# Виконуємо збірку проекту
RUN npm run build

# Використовуємо базовий образ nginx для розгортання статичних файлів
FROM nginx:alpine

# Копіюємо статичні файли з попереднього етапу збірки
COPY --from=build /app/build /usr/share/nginx/html

# Відкриваємо порт, на якому працює веб-сервер
EXPOSE 80

# Запускаємо веб-сервер при старті контейнера
CMD ["nginx", "-g", "daemon off;"]
