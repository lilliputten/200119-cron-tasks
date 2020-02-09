/** @module siteScanner
 *  @since 2020.02.09, 23:10
 *  @changed 2020.02.09, 23:10
 */

const config = require('./helpers/config');

const { DEBUG } = require('./helpers/logger');

const siteScanner = /** @lends siteScanner */ {

  start: function() {

    DEBUG('Task runner started', {
      config,
    });

  },

};

module.exports = siteScanner;

