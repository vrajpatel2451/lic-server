FROM nginx:alpine

RUN adduser -u 1000 -D -S -G www-data www-data

COPY ./default.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD [“nginx”, “-g”, “daemon off;”]