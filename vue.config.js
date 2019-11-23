const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: config => {
    config.resolve.alias['@web'] = path.resolve(process.cwd(), 'web')
  },
  outputDir: 'www',
  pages: {
    index: {
      entry: 'web/main.ts',
      template: 'public/index.html',
      title: 'Index Page',
    },
  },
  devServer: {
    // proxy: 'http://localhost:3000',
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
