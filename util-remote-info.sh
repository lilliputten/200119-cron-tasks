#!/bin/sh
# @desc Sample remote command
# @changed 2019.11.08, 11:14

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

echo "Remote server: $SERVER..."
$PLINK_CMD $SERVER "cd $REMOTE_TARGET_PATH && pwd && ls -la && ps|grep node"
