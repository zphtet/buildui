# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the project files to the container
COPY . .

# Build the React app
RUN npm run build

# Cloud Run uses PORT env (default 8080)
ENV PORT=8080
EXPOSE 8080

# Serve production build (not dev server)
CMD [ "npm", "run", "serve" ]