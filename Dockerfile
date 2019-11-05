FROM node:13.0.1-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build:storybook

FROM nginx:1.16.0-alpine

COPY --from=builder /usr/src/app/storybook-static /usr/share/nginx/html