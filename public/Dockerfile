FROM nginx:alpine
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./ /usr/share/nginx/www/