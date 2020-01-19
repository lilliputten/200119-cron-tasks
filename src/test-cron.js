/** @module test-cron.js
 *  @since 2020.01.18, 17:00
 *  @changed 2020.01.18, 17:00
 */

const fs = require('fs');
const path = require('path');

const dateStringFormat = 'Y.m.d H:i:s.u'; // for php-date-dormatter -- TODO: Use config
// const outDatetimePrefix = 'ymd-His-';

const DateFormatter = require('./lib/php-date-formatter');
const dateFmt = new DateFormatter();
const dateformat = (timestamp, format) => dateFmt.formatDate(new Date(timestamp), format);

const currTime = Date.now();
const dateTag = dateformat(currTime, dateStringFormat);

// const srcDir = path.resolve(__dirname);
const rootDir = path.resolve(__dirname, '..');

const logFileName = path.resolve(rootDir, 'log.txt');

console.log('Run at ' + dateTag + ' for log file: ' + logFileName); // eslint-disable-line no-console

const logStr = dateTag + ' OK\n';
fs.appendFileSync(logFileName, logStr);
