/** @module index
 *  @desc Server main file
 *  @since 2019.03.20, 15:33
 *  @changed 2020.01.19, 21:51
 */

const { DEBUG } = require('./helpers/logger');

const { options, parseOptions } = require('./helpers/options');

const config = require('./helpers/config');

const taskRunner = require('./taskRunner');

if (parseOptions()) {

  DEBUG('Build: ' + config.buildTag);

  // const { startDelay } = config
  // DEBUG('Starting with delay ' + startDelay + 'ms...')
  // setTimeout(() => {
  // }, startDelay)

  Object.assign(config, options);

  taskRunner.start();

}
