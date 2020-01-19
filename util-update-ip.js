/** @module util-update-ip
 *  @desc Update host machine ip in config
 *  @changed 2020.01.19, 22:22
 */
/* eslint-disable no-console */

const fs = require('fs');
const ip = require('ip');
const ipAddr = ip.address();

const configFile = 'config.js';
const paramName = 'transferLogsTo';
const paramRegexp = new RegExp('(("|\'|)\\b' + paramName + '\\b\\2\\s*:\\s*("|\')).*?(\\3)', 'm');

console.log('Config file:', configFile);
console.log('IP address:', ipAddr);

const origContent = fs.readFileSync(configFile, 'utf8').toString();
const newContent = origContent.replace(paramRegexp, '$1' + ipAddr + '$3');

if (origContent === newContent) {
  console.log('IP is absent in config or was not changed');
  process.exit(0);
}

console.log('Updating config file...');
fs.writeFileSync(configFile, newContent, 'utf8');
console.log('OK');
