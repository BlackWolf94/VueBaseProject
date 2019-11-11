import {createLoader, createRule} from '../untils';

const defaultStyleLoader = (modules?: any) => ([
    createLoader('vue-style-loader', {
        sourceMap: false,
        shadowMode: false,
    }),
    createLoader('css-loader', {
        sourceMap: false,
        importLoaders: 2,
        modules,
    }),
    createLoader('postcss-loader', {
        sourceMap: false,
    }),
    createLoader('sass-loader', {
        sourceMap: false,
        sassOptions: {
            indentedSyntax: true,
        },
        prependData: '@import \'~vuetify/src/styles/styles.sass\'',
    }),
]);


export const styleLoaderConf = [
    createRule(/\.p(ost)?css$/)
        .oneOf(/module/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }).slice(0, 3))
        .oneOf(/\?vue/, defaultStyleLoader().slice(0, 3))
        .oneOf(/\.module\.\w+$/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }).slice(0, 3))
        .oneOf(null, defaultStyleLoader().slice(0, 3)),

    createRule(/\.p(ost)?css$/)
        .oneOf(/module/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }).slice(0, 3))
        .oneOf(/\?vue/, defaultStyleLoader().slice(0, 3))
        .oneOf(/\.module\.\w+$/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }).slice(0, 3))
        .oneOf(null, defaultStyleLoader().slice(0, 3)),

    createRule(/\.s[ac]ss$/)
        .oneOf(/module/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(/\?vue/, defaultStyleLoader())
        .oneOf(/\.module\.\w+$/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(null, defaultStyleLoader()),
];
