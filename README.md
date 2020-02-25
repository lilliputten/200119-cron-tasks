<!--
 @changed 2020.02.25, 23:00
-->

## Commands

```shell
grep CRON /var/log/syslog
crontab -l
crontab -e
```

Crontab sample (run script every 10 minutes)
```
*/10 * * * * node ~/Work/200119-cron-tasks/index.js >> ~/log-cron.txt
```
