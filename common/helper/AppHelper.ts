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
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEBUG: true,
    APP_NAME: 'NestJs&VueJs',
    ...loadEnv('.env'),
};


export default class AppHelper {

    static getEnv(key?: string): any {
        return key ? buildConf[key] || process.env[key] : buildConf;
    }

    static isProd() {
        return buildConf.NODE_ENV === 'production';
    }

    static isDev() {
        return buildConf.NODE_ENV !== 'production';
    }

    static pathResolve(...folder: string[]): string {
        return folder ? path.resolve(rootDir, ...folder) : rootDir;
    }

    static port() {
        return this.getEnv('PORT') || 3000;
    }

    static ssrDevPort() {
        return this.getEnv('SSR_DEV_PORT') || 3030;
    }

    static ssrTemplatePath() {
        return this.pathResolve('./public/index.ssr.html');
    }

    static ssrBundle() {
        return this.pathResolve('./dist/vue-ssr-server-bundle.json');
    }

    static ssrManifest() {
        return this.pathResolve('./dist/vue-ssr-client-manifest.json');
    }

    static ssrOptions() {
        return {
            runInNewContext: false,
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
        };
    }

}
