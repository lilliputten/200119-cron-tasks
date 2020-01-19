#!/bin/sh
# @desc Enable ssh on remote server
# @changed 2019.12.17, 12:09

# If no arguments specified...
if [ $# -ne 1 ]; then
  echo "Usage: $0 <server>"
  exit 1
fi

# Remote server
SERVER=$1

echo "ssh enabling not used"

# echo "Enabling ssh on $SERVER..."
# wget -t 1 -T 3 -O- --progress=dot:default --no-check-certificate https://$SERVER:11111/ssh_on 2>&1
