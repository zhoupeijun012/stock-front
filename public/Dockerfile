FROM nginx:alpine

# 更新包索引并安装Certbot和相关插件
RUN apk update && apk add --no-cache certbot certbot-nginx

COPY certbot.sh /usr/local/bin/certbot.sh
RUN chmod +x /usr/local/bin/certbot.sh

# 复制Nginx配置文件
COPY ./nginx.conf /etc/nginx/nginx.conf

# 复制网站文件
COPY ./ /usr/share/nginx/www/

# 暴露端口
EXPOSE 80 443

# 启动Nginx
CMD ["/usr/local/bin/certbot.sh"]