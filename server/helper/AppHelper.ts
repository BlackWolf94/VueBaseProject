import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

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
        return this.getEnv('PORT') || 5000;
    }

    public static ssrDevPort() {
        return this.getEnv('SSR_DEV_PORT') || 5001;
    }

    public static ssrTemplatePath() {
        return this.pathResolve('/public/index.ssr.html');
    }
}
