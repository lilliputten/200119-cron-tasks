#!/bin/sh
# @desc Remote utils configuration
# @changed 2020.01.19, 22:25

# Essential project params...

export PROJECT_NAME="cron-tasks" # Project (and folder) name
# export PROJECT_NAME=`basename "${PWD}"` # Example: get project name from current folder

export REMOTE_TARGET_PATH="/home/pi/Work/${PROJECT_NAME}" # Destination folder

export ROOTFILES="
  README.md \
  build-tag.txt \
  package*.json \
  index.js \
  config.js \
  install-node-modules.sh \
"

# Common params...

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

export BUILD_TAG=`cat "./build-tag.txt"`
if [ -z "$BUILD_TAG" ]; then
  echo "Build tag must be defined!"
  exit 1
fi

export ARCNAME="$PROJECT_NAME-$BUILD_TAG.tgz"
