import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const rootDir = path.resolve(process.cwd(), './');
export const srcDir = path.resolve(process.cwd(), 'web');
export const outDir = (dir: string) => path.resolve(process.cwd(), dir);
export const tsconfig = path.resolve(rootDir, 'tsconfig.json');

const loadEnv = (envFile: string) => {
    const filePath = path.resolve(rootDir, envFile);
    return fs.existsSync(filePath) ? dotenv.parse(fs.readFileSync(filePath)) : {};
};

export const buildConf = {
    NODE_ENV: 'development',
    DEBUG: true,
    APP_NAME: 'NestJs&VueJs',
    ...loadEnv('.env'),
    ...process.env,
};

export const isProd = buildConf.NODE_ENV === 'production';

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

export const makeEntry = (entry: string) => path.resolve(srcDir, `entry-${entry}.ts`);


export const pathResolve = (name: string) => path.resolve(rootDir, name);

export const publicDir = '/dist/';
