/** @module babel.config
 *  @description Babel configuration
 *  @since 2019.03.06, 12:00
 *  @changed 2019.08.29, 11:32
 */
module.exports = {
  presets: [
    [ '@babel/preset-env', {
      loose: true,
      exclude: [
        '@babel/plugin-transform-typeof-symbol',
      ],
    }],
  ],
  plugins: [
    [ 'module-resolver', { // https://github.com/tleunen/babel-plugin-module-resolver
      root: [ './src' ],
      alias: {
        config: [ './src/config' ],
        lib: [ './src/lib' ],
        core: [ './src/core' ],
        components: [ './src/components' ],
        helpers: [ './src/helpers' ],
        demo: [ './src/demo' ],
      },
    }],
    'directory-resolver', // https://github.com/mgcrea/babel-plugin-directory-resolver
  ],
};
