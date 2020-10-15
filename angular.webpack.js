/**
 * Custom angular webpack configuration
 */

const path = require('path');

module.exports = (config, options) => {
  config.target = 'electron-renderer';
  config.externals = {
    typeorm: "require('typeorm')",
    // require drivers like below line for you database here e.g: sqlite, sqljs etc ...
    // example:
    // pg: "require('pg')",
  };

  config.resolve = {
    alias: {
      // Also make sure to resolve path for your drivers like below
      // example:
      // pg: path.resolve(__dirname, "../node_modules/typeorm/pg"),
      typeorm: path.resolve(__dirname, "../node_modules/typeorm/typeorm-model-shim"),
    }
  };


  if (options.fileReplacements) {
    for (let fileReplacement of options.fileReplacements) {
      if (fileReplacement.replace !== 'src/environments/environment.ts') {
        continue;
      }

      let fileReplacementParts = fileReplacement['with'].split('.');
      if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
        config.target = 'web';
      }
      break;
    }
  }

  return config;
}
