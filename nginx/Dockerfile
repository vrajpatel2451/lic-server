FROM nginx

# RUN adduser -u 1000 -D -S -G www-data www-data

COPY ./default.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

# RUN nginx -g daemon off;

CMD [“nginx”]