FROM node:alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --silent
RUN npm install react-scripts -g --silent

COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

