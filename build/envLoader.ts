import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const loadDotEnv = (filePath: string) => dotenv.parse(fs.readFileSync(path.resolve(__dirname, filePath)));

const defaultConfig = loadDotEnv('../.env');
const defaultConfigKey = [
    'NODE_ENV',
];

let baseConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
};

baseConfig = {...baseConfig, ...defaultConfig};

try {
    const envConfig = loadDotEnv(`../.env.${baseConfig.NODE_ENV}`);
    baseConfig = {...baseConfig, ...envConfig};
} catch (e) {

}

try {
    const envConfig = loadDotEnv(`../.env.local`);
    baseConfig = {...baseConfig, ...envConfig};
} catch (e) {

}

try {
    const envConfig = loadDotEnv(`../.env.${baseConfig.NODE_ENV}.local`);
    baseConfig = {...baseConfig, ...envConfig};
} catch (e) {

}

export default ({customConfig = {}, stringify = true}: any) => {
    const config: any = {...baseConfig};
    Object.keys(customConfig)
        .filter((key) => (defaultConfigKey.indexOf(key) === -1))
        .forEach((key) => { config[key] = customConfig[key]; });

    if (!stringify) {
        return config;
    }

    for (const key in config) {
        if (config.hasOwnProperty(key)) {
            config[key] = JSON.stringify(config[key]);
        }
    }

    return config;
};
