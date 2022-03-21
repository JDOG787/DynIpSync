export default (ip) => `
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
user root;
worker_processes  1;

pid    /var/run/nginx.pid;

events {
    worker_connections  1024;  ## Default: 1024
}

stream {

    log_format basic '$remote_addr [$time_local] '
        '$protocol $status $bytes_sent $bytes_received '
        '$session_time';

    # TCP traffic for MC Java Edition
    server {
        listen 25565; # Listens for TCP traffic on port 25565
        proxy_pass ${ip}:25565; # Sends traffic to Paper Server
        access_log /var/log/nginx/access.log basic buffer=1k;
    }

    # UDP traffic for java query thingy
    server {
        listen 25565 udp;
        proxy_pass ${ip}:25565;
    }

    # Voice server
    server {
	    listen 24454 udp;
	    proxy_pass ${ip}:24454;
    }

    # Map traffic
    server {
       listen 80; # Listens for TCP traffic on port 80
       proxy_pass ${ip}:8080; # Sends traffic to SSH server
    }

}`;