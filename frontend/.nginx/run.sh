#!/bin/sh

# nginx config variable injection
# envsubst < nginx.conf > /etc/nginx/conf.d/default.conf

# htpasswd for basic authentication
htpasswd -c -b /etc/nginx/.htpasswd admin admin

nginx -g "daemon off;"