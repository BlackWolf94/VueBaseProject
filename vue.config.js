const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: config => {
    // config.entry = path.resolve(process.cwd(), './web/main.ts');
    config.entry.app =  './web/main.ts';
    config.resolve.alias['@web'] = path.resolve(process.cwd(), 'web');
    delete config.resolve.alias['@'];
    return config;
  },
  outputDir: 'www'
};
