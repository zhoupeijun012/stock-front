FROM nginx:alpine

# 更新包索引并安装Certbot和相关插件
RUN apk update && apk add --no-cache certbot certbot-nginx

# 复制Nginx配置文件
# COPY default.conf /etc/nginx/conf.d/default.conf

# 复制网站文件
# COPY ./ /usr/share/nginx/www/

# 暴露端口
EXPOSE 80 443

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]