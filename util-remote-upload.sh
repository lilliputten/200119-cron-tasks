#!/bin/sh
# @desc Upload build to remote server
# @changed 2019.11.14, 15:45

# If no arguments specified...
if [ $# -lt 1 ]; then
  echo "Usage: $0 <server>"
  exit 1
fi

# Server to upload
SERVER=$1

# Config import
. ./util-config.sh

# && echo "Creating archive ($ARCNAME)..." \
# && mkdir -p "$ARCDIR" \
# && $ARC_CMD "$ARCDIR/$ARCNAME" --exclude "*.bak" --exclude "*.tmp" --exclude "*_" --exclude "*.sw?" img/* src/* $ROOTFILES \

echo "Uploading to $SERVER..." \
&& sh "./util-remote-enable-ssh.sh" $SERVER \
&& sh util-local-pack-build.sh \
&& echo "Cleaning up remote folders..." \
&& $PLINK_CMD $SERVER "rm -Rf $REMOTE_TARGET_PATH/img $REMOTE_TARGET_PATH/src $REMOTE_TARGET_PATH/scans" \
&& echo "Cleaning up remote root files..." \
&& $PLINK_CMD $SERVER "rm -f $REMOTE_TARGET_PATH/* > /dev/null 2>&1 || echo \(Ommited last command errors\)" \
&& echo "Creating remote folders..." \
&& $PLINK_CMD $SERVER "mkdir -p -m 0777 $REMOTE_TARGET_PATH/$REMOTE_ARCDIR" \
&& echo "Copying archive to remote..." \
&& $CP_CMD "$ARCDIR/$ARCNAME" "$SERVER:$REMOTE_TARGET_PATH/$REMOTE_ARCDIR/" \
&& echo "Extracting archive on remote..." \
&& $PLINK_CMD $SERVER "cd $REMOTE_TARGET_PATH && tar xzf \"$REMOTE_ARCDIR/$ARCNAME\"" \
&& echo "OK"
