FROM node:18

# Create app directory
WORKDIR /usr/src/

# Copy file  package.json and package-lock.json to install  app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
# Intall app dependencies
RUN npm install

# Copia el código fuente de tu aplicación en el contenedor

COPY ./src ./src

# Expone el puerto que utilizará tu aplicación

EXPOSE 8888

# Start the application using "npm run dev" when the container starts
CMD ["npm", "run", "dev"]
