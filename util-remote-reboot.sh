#!/bin/sh
# @desc Reboot physical terminal device
# @changed 2019.12.04, 08:42

# If no arguments specified...
if [ $# -ne 1 ]; then
  echo "Usage: $0 <server>"
  exit 1
fi

# Remote server
SERVER=$1
shift

# Config import
. ./util-config.sh

echo "Rebooting remote terminal device on $SERVER..." \
  && sh "./util-remote-enable-ssh.sh" $SERVER \
  && echo "Rebooting..." \
  && $PLINK_CMD $SERVER "sudo reboot -f &" \
  && echo OK

# # Alt method (url):
# wget -O- -q --no-check-certificate http://$SERVER/reboot 2>&1 \
