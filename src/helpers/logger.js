/** @module logger
 *  @since 2019.03.20, 15:33
 *  @changed 2019.10.25, 12:29
 */

const fs = require('fs');
const path = require('path');

const prettyjson = require('prettyjson');
const chalk = require('chalk');

const DateFormatter = require('../lib/php-date-formatter');
const dateFmt = new DateFormatter();
// const date1 = dateFmt.parseDate('23-Sep-2013 09:24:12', 'd-M-Y H:i:s');
// const date2 = dateFmt.formatDate(date1, 'd-F-Y h:i:s A');
// const dateformat = require('dateformat'); // Use dateFmt.formatDate instead dateformat
const dateformat = (timestamp, format) => dateFmt.formatDate(new Date(timestamp), format);

const config = require('./config');

// const logFileName = path.resolve(rootDir, logFile)

// No Debug/log option -- zero logging entries
const NOOP = function(){};
let DEBUG = NOOP;

let logger = { DEBUG };

let initedLogFile = false;

// Prepare meta keys dictionary...
const metaKeys = {
  title: [
    '::',
    ':title:',
    '_title',
  ],
  id: [
    ':id:',
    '_id',
  ],
  time: [
    ':time:',
    '_time',
  ],
};
// const titleKey = metaKeys.title[0]
const metaKeysMap = Object.entries(metaKeys)
  .reduce((metaKeysMap, [id, data]) => {
    if (Array.isArray(data)) {
      data.map((synId) => {
        metaKeysMap[synId] = id;
      });
    }
    else {
      metaKeysMap[data] = id;
    }
    return metaKeysMap;
  }, {});

// If no debug...
if (config.useDebug) {

/** logging Logging facility...
 */
logger = {

  prettyjsonOptions: {
    keysColor: 'green',
    dashColor: 'white',
    stringColor: 'white',
    numberColor: 'magenta',
  },

  makeLogHeader: function(metaData = {}) {

    // Default time: current
    const currTime = Date.now();
    const time = Number(metaData.time) || currTime;

    const dateTag = dateformat(time, config.dateStringFormat);

    let title = time + ' ' + dateTag + ' ' + (metaData.id || 'SERVER').replace(/\s+/g, '-');

    title = chalk.green('[' + title + ']');

    if (metaData.title) {
      title += '\n' + chalk.red(metaData.title);
    }

    return title;

  },

  /** Log string to output & to file
   * @param {string} s
   */
  outputString: function (/* string, ... */) {

    let logStr = Array.from(arguments).join(' ').trim() + '\n';

    // Print entry to console
    if (config.outputDebug) {
      console.log(logStr); // eslint-disable-line no-console
    }

    if (config.writeDebug) {

      // Format output for log file...
      const fileData = logStr
        // Remove chalk controls
        .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '') // eslint-disable-line no-control-regex
        // Remove spaces before newlines
        .replace(/\s*\n/gs, '\n')
        + '\n'
      ;

      // Write to file (sync)
      try {
        if (!initedLogFile) {
          this.initLogFile();
          initedLogFile = true;
        }
        const logFileName = path.resolve(config.rootDir, config.logFile);
        fs.appendFileSync(logFileName, fileData);
      }
      catch (err) {
        console.error(err); // eslint-disable-line no-console
      }

    }

  },

  /** Output received data */
  log: function() {

    const args = Array.from(arguments) || [];

    this.outputString.apply(this, args);

  },

  /** Output received data */
  debug: function(/* title, data */) {

    const args = Array.from(arguments);

    const metaData = {};

    // First string argument -- log entry title
    if (typeof args[0] === 'string') {
      metaData.title = args.shift().trim();
    }

    // Parse data...
    const parts = args.map((data/* , n */) => {

      if (typeof data === 'object') {
        data = Object.entries(data).reduce((data, [id, val]) => {
          // Meta key?
          const metaId = metaKeysMap[id];
          if (metaId) { // Store to all metas if meta
            metaData[metaId] = val;
          }
          else { // Remain in data
            data[id] = val;
          }
          return data;
        }, {});
        data = prettyjson.render(data, this.prettyjsonOptions)
          .replace(/(?:^|\n)(\s*)"""(\n[\s\S]*?\n)\s*"""(?:$|\n)/gs, (match, space, content) => {
            // Remove spaces from lines start?
            const reg = new RegExp('\\n' + space, 'gs');
            content = content.replace(reg, '\n');
            return content;
          })
          .trim();

      }

      return data;

    });

    // Create log title
    const logHeader = this.makeLogHeader(metaData);

    parts.unshift(logHeader);

    this.outputString.call(this, parts.join('\n'));

  },

  /** Initialize logger */
  initLogFile: function() {
    const logFileName = path.resolve(config.rootDir, config.logFile);
    if (!config.preserveLogs && fs.existsSync(logFileName)) {
      // console.log('Removing log file', logFileName)
      try {
        fs.unlinkSync(logFileName);
      }
      catch(error) {
        console.error('Removing log file error:', error); // eslint-disable-line no-console
      }
    }
  },

};

// Redefine real logging entries
logger.DEBUG = function DEBUG() { logger.debug.apply(logger, arguments); };

}

module.exports = logger;
