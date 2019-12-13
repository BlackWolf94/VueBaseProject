/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */
import AppHelper from '../../../../../../../common/helper/AppHelper';


const outDir = 'dist/';
const srcDir = 'src/web';

export class SSRBuildConf {

  static tsConfig = AppHelper.pathResolve('tsconfig.json');
  static srcDir = AppHelper.pathResolve(srcDir);
  static outDir = AppHelper.pathResolve(outDir);
  static publicDir = AppHelper.pathResolve(`/${outDir}/`);
  static bundle = AppHelper.pathResolve(outDir, 'vue-ssr-server-bundle.json');
  static manifest = AppHelper.pathResolve(outDir, 'vue-ssr-client-manifest.json');
  static template = AppHelper.pathResolve('public', 'index.ssr.html');

  static buildOptions(conf: {[key: string]: any} = {}) {
    return {
      NODE_ENV: process.env.NODE_ENV || 'development',
      DEBUG: true,
      ...AppHelper.getEnv(),
      ...conf,
    };
  }

  static stringify(conf: {[key: string]: any} = {}): {[key: string]: string} {
    const env: any = {};
    conf = this.buildOptions(conf);

    Object.keys(conf).forEach((key: string) => {
      env[`process.env.${key}`] = JSON.stringify(conf[key]);
    });
    return env;
  }

  static entry(entry: 'client'| 'server') {
    return AppHelper.pathResolve(srcDir, `entry-${entry}.ts`);
  }

  static assetPath(fileName: string): string {
    fileName = fileName.split(this.publicDir).pop();
    return AppHelper.pathResolve(outDir, fileName);
  }
}
