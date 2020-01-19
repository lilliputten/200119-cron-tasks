#!/bin/sh
# @desc Create archive with build without upload
# @changed 2019.12.03, 15:53

# Config import
. ./util-config.sh

echo "Creating archive ($ARCNAME)..." \
&& mkdir -p "$ARCDIR" \
&& $ARC_CMD "$ARCDIR/$ARCNAME" --exclude "*.bak" --exclude "*.tmp" --exclude "*_" --exclude "*.sw?" src/* $ROOTFILES \
&& echo OK
