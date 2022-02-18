FROM node:16-alpine 

LABEL maintainer="Ahmed Elsharkawy"
LABEL version="1.0"

# Add a work directory
WORKDIR /app

# copy * project files
COPY . .

# Run multiple commands concurrently
RUN npm install -g concurrently
# install all the dependencies
RUN npm run install:dependencies

# TODO: we can improve it later
# Build the app
# RUN yarn build

# Start the app
CMD [ "npm", "start" ]

# Expose port
EXPOSE 3000
EXPOSE 8000

