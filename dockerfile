# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

RUN cp /root/.npm/_logs/2024-07-02T04_24_56_124Z-debug-0.log /path/to/access/debug.log


# Install dependencies
RUN npm install || npm install || npm install


# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the built files
# FROM nginx:alpine
# COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3001

# Start the server
CMD ["npm", "start"]