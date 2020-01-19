/** @module utils (ex common)
 *  @since 2019.07.04, 14:38
 *  @changed 2019.11.08, 11:36
 */

// const fs = require('fs')
const path = require('path');

const { DEBUG } = require('./DEBUG');

const config = require('./config');
const { // Expose config variables
  uploadDir,
  replaceUploadsDir,
  useDebugStops,
} = config;

const ipv6remove = '::ffff:';
const ipv6localhost = '::1';
const localhost = 'localhost';

const utils = {

  delayPromise: function(timeout, value) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout, value);
    });
  },

  /** Get client origin host
   * @param {Object} req
   * @return {String}
   */
  getRequestClientOrigin: function(req) {
    const { headers } = req;
    const host = (headers.origin || headers.referer || 'UNKNOWN').replace(/^https?:\/\/([A-z0-9._-]+).*?$/, '$1');
    return host;
  },

  /** Get client ip
   * @param {Object} req
   * @return {String}
   */
  getRequestClientIp: function(req) {
    let ip = req.ip;
    if (!ip || ip === ipv6localhost) {
      ip = localhost;
    }
    else if (ip.startsWith(ipv6remove)) {
      ip = ip.substr(ipv6remove.length);
    }
    return ip;
  },

  prepareDestDir: function(dirName) {
    if (uploadDir && replaceUploadsDir && dirName.indexOf(replaceUploadsDir) === 0) {
      dirName = dirName.substr(replaceUploadsDir.length);
      // if (dirName.indexOf('/') === 0) {
      //   dirName = dirName.substr(1)
      // }
      // dirName = path.resolve(uploadDir, dirName)
      dirName = path.join(uploadDir, dirName);
    }
    return dirName;
  },

  notFoundHandler: function(req, res/* , next */) {

    // req keys:
    // _readableState, readable, domain, _events, _eventsCount, _maxListeners,
    // socket, connection, httpVersionMajor, httpVersionMinor, httpVersion,
    // complete, headers, rawHeaders, trailers, rawTrailers, aborted, upgrade,
    // url, method, statusCode, statusMessage, client, _consuming, _dumped, next,
    // baseUrl, originalUrl, _parsedUrl, params, query, res, body, read, fields,
    // files, express_formidable

    const msg = 'Route not found';

    const { method, url, headers } = req;
    const { /* origin, */ referer, host } = headers;

    DEBUG('Error', { msg, url, method, referer, host });

    if (useDebugStops) {
      debugger; // eslint-disable-line no-debugger
    }

    const message = msg + ': ' + method + ' ' + url;

    return res.status(404).send(message);

  },

  /** Parse url query string (in form `?xx=yy&...` or `xx=yy&...`)
   * @param {object} query - Query object
   * @param {object} [opt] - Options
   * @param {Boolean} [opt.prefix] - Query prefix symbol (default: '?')
   * @param {Boolean} [opt.delimiter] - Delimiter symbol (default: '&')
   * @param {Boolean} [opt.preserveNullable] - Preserve null & undefined values as 'null' & 'undefined' crsp.
   * @return {string} search - Query string
   */
  makeQuery: function(data, opt) {

    // opt = opt || {};
    opt = Object.assign({ prefix: '?', delimiter: '&' }, opt);

    const keys = Object.keys(data);
    let query = keys.reduce(function(query, key){
      let val = data[key];
      // Convert nulls to empty string if preserveNullable flag isnt specified
      if (!opt.preserveNullable && val == null) {
        val = '';
      }
      key = encodeURIComponent(key);
      val = encodeURIComponent(val);
      if ((val !== '' && val !== 'false') || !opt.omitEmpty) {
        // Adds a delimiter if query isn't empty...
        if (query) {
          query += opt.delimiter;
        }
        query += key + '=' + val;
      }
      return query;
    }, '');

    if (opt.prefix) {
      query = opt.prefix + query;
    }

    return query;

  },
};

module.exports = utils;
