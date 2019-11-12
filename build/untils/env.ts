import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const rootDir = path.resolve(process.cwd(), './');
export const srcDir = path.resolve(process.cwd(), './src');
export const outDir = path.resolve(process.cwd(), './dist');
export const tsconfig = path.resolve(rootDir, 'tsconfig.json');

const loadEnv = (envFile: string) => {
    const filePath = path.resolve(rootDir, envFile);
    return fs.existsSync(filePath) ? dotenv.parse(fs.readFileSync(filePath)) : {};
};

export const buildConf = {
    NODE_ENV: 'development',
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


