const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: config => {
    config.resolve.alias['@web'] = path.resolve(process.cwd(), 'src/web')
  },
  outputDir: 'www',
  pages: {
    index: {
      entry: 'src/web/main.ts',
      template: 'public/index.html',
      title: 'Vue APP',
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
