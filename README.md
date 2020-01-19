<!--
 @changed 2020.01.19, 22:46
-->

# Cron tasks runner

## Useful configuration commands

```shell
grep CRON /var/log/syslog
crontab -l
crontab -e
```

Typical cron string: `*/10 * * * *  node /home/pi/cron-tasks/index.js`
