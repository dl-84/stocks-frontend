FROM node:latest as build

WORKDIR /app

COPY . . 

RUN npm install

RUN npm install -g @angular/cli@8.3 --unsafe-perm=true --allow-root

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/stocks-frontend  /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80