import {createLoader, createRule} from '../untils';
import * as path from 'path';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {isProd, rootDir} from '../untils/env';

const srcPath = path.resolve(process.cwd(), 'src');

const defaultStyleLoader = (modules?: any) => ([
    createLoader(isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', {
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
]);

const sassLoader = (modules?: any) => [...defaultStyleLoader(modules), createLoader('sass-loader', {
    sourceMap: false,
    sassOptions: {
        indentedSyntax: true,
    },
    prependData: '@import \'~vuetify/src/styles/styles.sass\'',
})];

const stylusLoader = (modules?: any) => [...defaultStyleLoader(modules), createLoader('stylus-loader', {
    sourceMap: false,
    preferPathResolver: 'webpack',
})];

const createMediaRule = (test: RegExp, prefix: string) => createRule(test, null)
    .use(createLoader('file-loader', {
        limit: 4096,
        outputPath: `${prefix}/`,
        fallback: createLoader('file-loader', {
            name: `${prefix}/[name].[hash:8].[ext]`,
        }),
    }));

const styleOptions = {
    localIdentName: isProd ? '[name]_[local]_[hash:base64:5]' : '[name]_[local]',
};

export const _rules: any = [
    createRule(/\.vue$/)
        .use([
            createLoader('cache-loader', {
                cacheDirectory: path.resolve(rootDir, '/node_modules/.cache/vue-loader'),
            }),
            createLoader('vue-loader', {
                include: [srcPath],
                cacheDirectory: path.resolve(rootDir, '/node_modules/.cache/vue-loader'),
                compilerOptions: {
                    whitespace: 'condense',
                },
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
            }),
        ]),
    createMediaRule(/\.(png|jpe?g|gif|webp)(\?.*)?$/, 'img'),
    createMediaRule(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, 'media'),
    createRule(/\.(svg)(\?.*)?$/).use(createLoader('file-loader', {
        name: isProd ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]',
        }),
    ),
    createMediaRule(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i, 'fonts'),
    ...[/\.css$/, /\.p(ost)?css$/].map((test) => createRule(test)
        .oneOf(/module/, defaultStyleLoader(styleOptions))
        .oneOf(/\?vue/, defaultStyleLoader())
        .oneOf(/\.module\.\w+$/, defaultStyleLoader(styleOptions))
        .oneOf(null, defaultStyleLoader())),

    createRule(/\.s[ac]ss$/)
        .oneOf(/module/, sassLoader(styleOptions))
        .oneOf(/\?vue/, sassLoader())
        .oneOf(/\.module\.\w+$/, sassLoader(styleOptions))
        .oneOf(null, sassLoader()),

    createRule(/\.styl(us)?$/)
        .oneOf(/module/, stylusLoader(styleOptions))
        .oneOf(/\?vue/, stylusLoader())
        .oneOf(/\.module\.\w+$/, stylusLoader(styleOptions))
        .oneOf(null, stylusLoader()),
    createRule(/.js$/, 'babel-loader')
        .exclude(/node_modules/),

    createRule(/\.(ts|tsx)$/).use([
        // createLoader('cache-loader', {
        //     // cacheDirectory: path.resolve(__dirname, '../../node_modules/.cache/ts-loader'),
        // }),
        // createLoader('thread-loader'),
        // createLoader('babel-loader'),
        createLoader('ts-loader', {
            transpileOnly: true,
            appendTsSuffixTo: [
                '\\.vue$',
            ],
            // happyPackMode: true,
        }),
    ]),
    createRule(/\.pug$/)
        .oneOf(/^\?vue/, [createLoader('pug-plain-loader')])
        .oneOf(null, [
            createLoader('raw-loader'),
            createLoader('pug-plain-loader'),
        ]),
];
