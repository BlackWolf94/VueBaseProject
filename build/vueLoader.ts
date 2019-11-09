import envLoader from './envLoader';
import styleLoader from './styleLoader';

const config = envLoader({
    stringify: false,
});

const isProd = config.NODE_ENV === 'production';

export default {
    extractCSS: process.env.NODE_ENV === 'production',
    preserveWhitespace: false,
    loaders: styleLoader.getVueLoaders(isProd, isProd),
    postcss: [
        require('autoprefixer')({
            browsers: ['last 3 versions'],
        }),
    ],
};
