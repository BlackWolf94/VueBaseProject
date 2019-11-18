import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import LRU from 'lru-cache';

export const rootDir = path.resolve(process.cwd(), './');

const loadEnv = (envFile: string) => {
    const filePath = path.resolve(rootDir, envFile);
    return fs.existsSync(filePath) ? dotenv.parse(fs.readFileSync(filePath)) : {};
};

export const buildConf: any = {
    NODE_ENV: 'development',
    DEBUG: true,
    APP_NAME: 'NestJs&VueJs',
    ...loadEnv('.env'),
    ...process.env,
};


export default class AppHelper {

    public static getEnv(key?: string): any {
        return key ? buildConf[key] : buildConf;
    }

    public static isProd() {
        return buildConf.NODE_ENV === 'production';
    }

    public static isDev() {
        return buildConf.NODE_ENV !== 'production';
    }

    public static pathResolve(folder?: string): string {
        return folder ? path.resolve(rootDir, folder) : rootDir;
    }

    public static port() {
        return this.getEnv('PORT') || 3000;
    }

    public static ssrDevPort() {
        return this.getEnv('SSR_DEV_PORT') || 3030;
    }

    public static ssrTemplatePath() {
        return this.pathResolve('./public/index.ssr.html');
    }

    public static ssrBundle() {
        return this.pathResolve('./dist/vue-ssr-server-bundle.json');
    }

    public static ssrManifest() {
        return this.pathResolve('./dist/vue-ssr-client-manifest.json');
    }

    public static ssrOptions() {
        return {
            runInNewContext: false,
            basedir: this.pathResolve('./dist'),
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
        };
    }
}
