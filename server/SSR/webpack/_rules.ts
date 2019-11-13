import {createLoader, createRule} from '../builder';
import {webDir} from './_env';
import AppHelper from '../../helper/AppHelper';

const defaultStyleLoader = (modules?: any) => ([
    createLoader('vue-style-loader', {
        sourceMap: false,
        shadowMode: false,
    }),
    // createLoader(MiniCssExtractPlugin.loader, {
    //     hmr: !isProd,
    //     reloadAll: true,
    // }),
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

// @ts-ignore
export const rules = [
    createRule(/\.vue$/)
        .use([
            createLoader('cache-loader', {
                cacheDirectory: AppHelper.pathResolve('/node_modules/.cache/vue-loader'),
            }),
            createLoader('vue-loader', {
                include: [webDir],
                cacheDirectory: AppHelper.pathResolve( '/node_modules/.cache/vue-loader'),
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
            name: 'img/[name].[hash:8].[ext]',
        }),
    ),
    createMediaRule(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i, 'fonts'),
    ...[/\.css$/, /\.p(ost)?css$/].map((test) => createRule(test)
        .oneOf(/module/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(/\?vue/, defaultStyleLoader())
        .oneOf(/\.module\.\w+$/, defaultStyleLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(null, defaultStyleLoader())),

    createRule(/\.s[ac]ss$/)
        .oneOf(/module/, sassLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(/\?vue/, sassLoader())
        .oneOf(/\.module\.\w+$/, sassLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(null, sassLoader()),

    createRule(/\.styl(us)?$/)
        .oneOf(/module/, stylusLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(/\?vue/, stylusLoader())
        .oneOf(/\.module\.\w+$/, stylusLoader({
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }))
        .oneOf(null, stylusLoader()),
    createRule(/\.ts$/).use([
        createLoader('cache-loader', {
            // cacheDirectory: path.resolve(__dirname, '../../node_modules/.cache/ts-loader'),
        }),
        createLoader('thread-loader'),
        createLoader('babel-loader'),
        createLoader('ts-loader', {
            transpileOnly: true,
            appendTsSuffixTo: [
                '\\.vue$',
            ],
            happyPackMode: true,
        }),
    ]),
    createRule(/\.pug$/)
        .oneOf(/^\?vue/, [createLoader('pug-plain-loader')])
        .oneOf(null, [
            createLoader('raw-loader'),
            createLoader('pug-plain-loader'),
        ]),
];
