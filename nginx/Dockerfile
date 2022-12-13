# FROM nginx
# RUN rm /etc/nginx/conf.d/default.conf
# COPY default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# EXPOSE 443

# CMD ["nginx","-g","daemon off;"]


FROM nginx:alpine

RUN adduser -u 1000 -D -S -G www-data www-data

COPY ./default.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
CMD [ “nginx”, “-g”, “daemon off;” ]