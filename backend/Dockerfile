# Використовуємо базовий образ Node.js
FROM node:14-alpine

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

# Відкриваємо порт, на якому працює сервер
EXPOSE 3000

# Запускаємо сервер при старті контейнера
CMD [ "npm", "run", "start" ]
