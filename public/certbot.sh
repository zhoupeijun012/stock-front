#!/bin/bash

# 确保 Nginx 服务正在运行
# nginx -t && nginx

# 获取或更新证书
certbot --nginx -d www.chives.asia --non-interactive --agree-tos --email zhoupeijun012@163.com

# 启动一个定时任务来定期更新证书
while true; do
    sleep 12h
    certbot renew --nginx --non-interactive
done