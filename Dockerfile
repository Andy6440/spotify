FROM node:18

# Create app directory
WORKDIR /usr/src/

# Copy file  package.json and package-lock.json to install  app dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Intall app dependencies
RUN npm install

# Copia el código fuente de tu aplicación en el contenedor

COPY ./src ./src


# Compila TypeScript en JavaScript antes de ejecutar la aplicación
RUN npm run build
# Expone el puerto que utilizará tu aplicación

EXPOSE 3000

# Comando para ejecutar tu aplicación

CMD [ "node", "build/index.js" ]
