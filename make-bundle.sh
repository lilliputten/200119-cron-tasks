#!/bin/sh
# @desc Make production server build
# @changed 2019.11.29, 11:27

CONFIG='config.js'
BACKUP='config.dev.js'

COMMENT_CONFIG_VARS="transferLogsTo\|receiveLogs\|useDebug\|outputDebug\|writeDebug\|openPage\|useFakeResponses"

if [ -f "$BACKUP" ]; then
  echo "Backup config file ($BACKUP) already exists. Cannot to create production version."
  exit 1;
fi

echo "Creating production config..." \
  && cp "$CONFIG" "$BACKUP" \
  && cat "$BACKUP" \
    | sed "s/^\(\s*\)\(\($COMMENT_CONFIG_VARS\):\)/\1\/\/ \2/g" \
    > "$CONFIG" \
  && echo "Cleaning up..." \
  && rm -Rf "!ARC" "log.*" "$0" \
  && echo "OK"
