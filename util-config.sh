#!/bin/sh
# @desc Remote utils configuration
# @changed 2019.11.27, 16:43

export PROJECT_NAME="cron-tasks"
# export PROJECT_NAME=`basename "${PWD}"`

export DATE=`date "+%Y.%m.%d %H:%M:%S"`
export DATETAG=`date "+%y%m%d-%H%M"`

export PWD=`pwd`

export ARCDIR="../!ARC"
export REMOTE_ARCDIR="!ARC"

# Check for creditinals presence...
export TerminalServerPort="22" # Terminal connection port (may be sepcified in environment)
# Note: `$TerminalServerUser` and `$TerminalServerPw` taken from project environment
if [ -z "$TerminalServerUser" -o -z "$TerminalServerPw" -o -z "$TerminalServerPort" ]; then
  echo "Terminal creditinals must be specified in system environment!"
  exit 1
fi

# Commands configuration...
export PLINK_CMD="plink -C -P $TerminalServerPort -l $TerminalServerUser -pw $TerminalServerPw"
export CP_CMD="pscp -scp -r -C -P $TerminalServerPort -l $TerminalServerUser -pw $TerminalServerPw"

export ARC_CMD="tar czf"

export ROOTFILES="
  README.md \
  build-tag.txt \
  package*.json \
  index.js \
"

export REMOTE_TARGET_PATH="/home/pi/test-cron" # Destination folder

export BUILD_TAG=`cat "./build-tag.txt"`
if [ -z "$BUILD_TAG" ]; then
  echo "Build tag must be defined!"
  exit 1
fi

export ARCNAME="$PROJECT_NAME-$BUILD_TAG.tgz"
