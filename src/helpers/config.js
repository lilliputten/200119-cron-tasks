/** @module config
 *  @since 2019.03.20, 15:33
 *  @changed 2020.01.19, 21:51
 */

// Basic requirements
const fs = require('fs');
const path = require('path');

// Folder names...
// const helpersDir = path.resolve(__dirname);
const srcDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(srcDir, '..');
const uploadDir = path.resolve(rootDir, 'upload');

const buildTagFile = path.resolve(rootDir, 'build-tag.txt');

const buildTag = fs.readFileSync(buildTagFile, 'utf8');

const config = { // Default config values

  buildTag,

  srcDir,
  rootDir,
  // dateStringFormat: 'yyyy.mm.dd HH:MM:ss.l', // for npm's dateformat
  dateStringFormat: 'Y.m.d H:i:s.u', // for static lib/php-date-dormatter
  outDatetimePrefix: 'ymd-His-',

  logFile: 'log.txt',

  uploadDir,

};

// Extend config with `<rootDir>/config.js`
// TODO: Use config.json (thru fs.readFileSync -> JSON.parse?)
const configFile = path.resolve(rootDir, 'config.js');
if (fs.existsSync(configFile)) {
  Object.assign(config, require(configFile));
}

module.exports = config;
