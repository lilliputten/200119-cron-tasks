/**
 * @desc Terminal server config file
 * @changed 2019.11.19, 12:56
 */
module.exports = {
  useDebug: true, // Use debug options
  outputDebug: true, // Print debug to console
  writeDebug: true, // Write debug to log file
  receiveLogs: true, // To receive and store terminal logs info

  // Extra debug options...
  transferLogsTo: '192.168.1.148', // Transfer terminal logs to external machine
}
