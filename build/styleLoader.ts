import {createLoader} from './untils';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {NewLoader} from 'webpack';

const defaultLoaders: NewLoader[] = [
    createLoader('css-loader', {minimize: false}),
    // createLoader('scss-loader', {minimize: false}),
    createLoader('sass-loader', {
        sassOptions: {
            indentedSyntax: true,
        },
        prependData: '@import \'vuetify/src/styles/styles.sass\'',
    }),
    createLoader('resolve-url-loader'),
];

const generateExtractLoaders = (loaderName: string, minimize: boolean = false) => {
    const loaders = defaultLoaders.map((loader) => {
        if (loader.loader !== 'sass-loader') {
            loader.options.minimize = minimize;
        }

        return loader;
    });

    const options: any = {sourceMap: true};

    if (loaderName) {
        loaders.push(createLoader(`${loaderName}-loader`, options));
    }

    return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
    });
};


const generateInlineLoaders = (loaderName: string, minimize: boolean = false) => {

    return [
        createLoader('vue-style-loader'),
        ...(defaultLoaders.map(({loader, options}: any) => {
            const loaderOptions = Object.keys(options || {});
            if (minimize) {
                loaderOptions.push('minimize');
            }
            if (loaderOptions.length) {
                loader += `?${loaderOptions.join('&')}`;
            }
            return createLoader(loader);
        })),
        createLoader(`${loaderName}-loader?sourceMap`),
    ];
};

export default {
    getLoaders(loader: string, extract: boolean = false, minimize: boolean = false) {
        return extract ? generateExtractLoaders(loader, minimize) : generateInlineLoaders(loader, minimize);
    },
    getVueLoaders(extract: boolean = false, minimize: boolean = false) {
        return {
            sass: this.getLoaders('sass', extract, minimize),
            css: this.getLoaders('css', extract, minimize),
        };
    },
};
