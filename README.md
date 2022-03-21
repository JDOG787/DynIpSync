# What is this?
Most home networks have a dynamic public ip address, which means that your isp gives you a new public ip every so often. This is great for security, but when you run services on server on that network it can be quite annoying as you are constantly updating the ips for proxies, domains, etc. This script updates the ip for you automatically.

# Why?
Like I mentioned above, it's not ideal to have to routinely update ips for config files and domains especially when you have users that use your services. I got really frustrated with this, so much so that I stoped udpating it, or just frogot about it. So I decided why not automate it.

## What does it do?
It checks if the public ip of my home network has changed every few minutes. If it has, then it logs into my vps vi ssh, which I run my nginx proxy on and updates the nginx config file with the new ip.
