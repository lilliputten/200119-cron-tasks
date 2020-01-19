/** @module util-update-build-tag
 *  @changed 2019.11.26, 12:01
 */

const fs = require('fs')

const buildTagFile = 'build-tag.txt'

const pkgConfig = require('./package')
const { version } = pkgConfig

const DateFormatter = require('./src/lib/php-date-formatter')
const dateFmt = new DateFormatter()
// const date1 = dateFmt.parseDate('23-Sep-2013 09:24:12', 'd-M-Y H:i:s');
// const date2 = dateFmt.formatDate(date1, 'd-F-Y h:i:s A');
// const dateformat = require('dateformat'); // Use dateFmt.formatDate instead dateformat
const dateformat = (timestamp, format) => dateFmt.formatDate(new Date(timestamp), format)

const currTime = Date.now()
const dateTag = dateformat(currTime, 'ymd-Hi')

const buildTag = 'v.' + version + '-' + dateTag

console.log('Build tag:', buildTag)
console.log('Updating build tag file (' + buildTagFile + ')...')
fs.writeFileSync(buildTagFile, buildTag, 'utf8')
console.log('OK')
