/** @module taskRunner
 *  @since 2020.01.19, 21:55
 *  @changed 2020.01.19, 21:56
 */

const config = require('./helpers/config');

const { DEBUG } = require('./helpers/logger');

const taskRunner = /** @lends taskRunner */ {

  start: function() {

    DEBUG('Task runner started', {
      config,
    });

  },

};

module.exports = taskRunner;

