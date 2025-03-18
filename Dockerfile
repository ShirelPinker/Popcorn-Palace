# Use Node.js base image
FROM node:23

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose NestJS port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
