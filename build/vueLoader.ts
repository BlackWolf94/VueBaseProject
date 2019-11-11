import envLoader from './envLoader';
import styleLoader from './styleLoader';
// @ts-ignore
import {VuetifyProgressiveModule} from 'vuetify-loader';

const config = envLoader({
    stringify: false,
});

const isProd = config.NODE_ENV === 'production';

export default {
    extractCSS: process.env.NODE_ENV === 'production',
    // preserveWhitespace: false,
    // loaders: styleLoader.getVueLoaders(isProd, isProd),
    // postcss: [
    //     require('autoprefixer')({
    //         browsers: ['last 3 versions'],
    //     }),
    // ],
    options: {
        transformAssetUrls: {
            'v-app-bar': 'src',
            'v-carousel-item': [
                'src',
                'lazy-src',
            ],
            'v-img': [
                'src',
                'lazy-src',
            ],
            'v-navigation-drawer': 'src',
            'v-parallax': 'src',
            'v-toolbar': 'src',
        },
        compilerOptions: {
            modules: [VuetifyProgressiveModule],
            compilerOptions: {
                whitespace: 'condense',
            },
        },
    },
};
