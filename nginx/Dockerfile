# FROM nginx
# RUN rm /etc/nginx/conf.d/default.conf
# COPY default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# EXPOSE 443

# CMD ["nginx","-g","daemon off;"]


FROM nginx:alpine
COPY default.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
CMD [ “nginx”, “-g”, “daemon off;” ]