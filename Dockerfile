FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código (se sobreescribirá con bind mount)
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio en modo desarrollo (hot-reload)
CMD ["npm", "run", "start:dev"]