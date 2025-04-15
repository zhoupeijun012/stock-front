FROM nginx:latest

# 更新包索引并安装Certbot和相关插件
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx

# 复制Nginx配置文件
COPY ./nginx.conf /etc/nginx/nginx.conf

# 复制网站文件
COPY ./ /usr/share/nginx/www/

# 暴露端口
EXPOSE 80 443

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]