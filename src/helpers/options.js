/** @module options
 *  @desc Server main file
 *  @since 2019.07.16, 09:45
 *  @changed 2019.10.22, 13:40
 */

const commandLineArgs = require('command-line-args');

// Parse options...
const options = {};

const optionDefinitions = [
  // @see
  //   - https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md
  //   - https://github.com/75lb/command-line-args/blob/master/doc/API.md
  // NOTE: Curled quotes in descriptions processing by chalk parser.
  { alias: 'l', name: 'logsOnly', type: Boolean, description: 'Run only logging server.' },
  { alias: 'p', name: 'preserveLogs', type: Boolean, description: 'Do not delete log previous file.' },
  { alias: 'i', name: 'filterDebugIp', type: String, description: 'Accept logs only from specified clients (device hosts).' },
  { alias: 't', name: 'filterDebugTerminal', type: String, description: 'Accept logs only from specified origins (browser aka \'TERMINAL\' hosts).' },
  { alias: 'o', name: 'noLogs', type: Boolean, description: 'Disable debug routes (receive terminal logs).' },
  { alias: 'n', name: 'noServerLogs', type: Boolean, description: 'Disable server debug logs.' },
  { alias: 'h', name: 'help', type: Boolean, description: 'Print this usage guide.' },
];

/** printUsageAndExit
 * @param {Number} [exitStatus=0]
 */
function printUsage() {
  try {
    const commandLineUsage = require('command-line-usage');
    const sections = [
      {
        header: 'Description',
        content: 'Cron task runner'
      },
      {
        header: 'Options',
        optionList: optionDefinitions.map(({ name, alias, paramName, description }) => {
          if (alias) {
            name += ', -' + alias;
          }
          const data = { name, description };
          const param = paramName;
          data.typeLabel = param ? '{' + 'underline ' + param + '}' : ' '; // NOTE: Using non-empty string for avoiding
          return data;
        }),
      },
    ];
    const usage = commandLineUsage(sections);
    console.log(usage); // eslint-disable-line no-console
  }
  catch(error) {
    console.error('Usage error:', error); // eslint-disable-line no-console
    /*DEBUG*/ debugger; // eslint-disable-line no-debugger
  }
  // process.exit(exitStatus)
}

/** Parse options
 * @return {Boolean} - true if application can starts
 */
function parseOptions() {
  try {
    const parsedOptions = commandLineArgs(optionDefinitions);
    Object.assign(options, parsedOptions);
  }
  catch(error) {
    console.error('Options parsing error:', error.message); // eslint-disable-line no-console
    /*DEBUG*/ debugger; // eslint-disable-line no-debugger
    printUsage();

  }
  if (options.help) {
    printUsage();
    return false;
  }
  return true;
}

module.exports = {
  options,
  parseOptions,
  printUsage,
  optionDefinitions,
};
