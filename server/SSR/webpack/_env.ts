import AppHelper from '../../helper/AppHelper';
import {buildConf} from '../../../build/untils/env';

export const webDir = AppHelper.pathResolve('./web');
export const distDir = AppHelper.pathResolve('./dist');
export const tsconfig = AppHelper.pathResolve('tsconfig.json');


export const isProd = AppHelper.isProd();

export const makeConf = (conf: any = {}, stringify: boolean = true) => {
    conf = {...buildConf, ...conf};

    if (!stringify) {
        return conf;
    }

    Object.keys(conf).forEach((key: string) => {
        conf[key] = JSON.stringify(conf[key]);
    });
    return conf;
};

export const makeEntry = (entry: string) => AppHelper.pathResolve(`./web/entry-${entry}.ts`);
