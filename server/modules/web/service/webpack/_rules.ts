import * as path from 'path';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderOptions } from 'vue-loader';
import { LoaderOptions } from 'ts-loader/dist/interfaces';
import { createLoader, createRule } from './untils/Builder';
import { SSRBuildConf } from './untils/SSRBuildConf';
import AppHelper from '../../../../../common/helper/AppHelper';
import { RuleSetRule } from 'webpack';

const defaultStyleLoader = (isServer: boolean = false, modules?: any) => {
  const loaders = [
    createLoader(AppHelper.isProd() ? MiniCssExtractPlugin.loader : 'vue-style-loader', {
      sourceMap: false,
      shadowMode: false
    }),
    createLoader('css-loader', {
      sourceMap: false,
      importLoaders: 2,
      modules
    }),
    createLoader('postcss-loader', {
      sourceMap: false
    })
  ];

  if (isServer && AppHelper.isProd()) {
    loaders.shift();
  }

  return loaders;
};

const sassLoader = (isServer: boolean = false, modules?: any) => [...defaultStyleLoader(isServer, modules), createLoader('sass-loader', {
  sourceMap: false,
  sassOptions: {
    indentedSyntax: true
  },
  prependData: '@import \'~vuetify/src/styles/styles.sass\''
})];

const stylusLoader = (isServer: boolean = false, modules?: any) => [...defaultStyleLoader(isServer, modules), createLoader('stylus-loader', {
  sourceMap: false,
  preferPathResolver: 'webpack'
})];

const createMediaRule = (test: RegExp, prefix: string) => createRule(test, null)
  .use(createLoader('file-loader', {
    limit: 4096,
    outputPath: `/${prefix}/`,
    fallback: createLoader('file-loader', {
      name: AppHelper.isProd() ? `/${prefix}/[name].[hash:8].[ext]` : `${prefix}/[name].[ext]`
    })
  }));

const styleOptions = {
  localIdentName: AppHelper.isProd() ? 'css/[name]_[local]_[hash:base64:5]' : 'css/[name]_[local]'
};

const cacheLoader = (loaderPref: string) =>
  createLoader('cache-loader', {
    cacheDirectory: AppHelper.pathResolve(`/node_modules/.cache/${loaderPref}-loader`)
  });

export const loadRules = (isServer: boolean = false): RuleSetRule[] =>  {
  const rules = [
    createRule(/\.vue$/)
      .use([
        cacheLoader('vue'),
        createLoader<VueLoaderOptions>('vue-loader', {
          // include: [srcPath],
          cacheDirectory: AppHelper.pathResolve('/node_modules/.cache/vue-loader'),
          compilerOptions: {
            whitespace: 'condense'
          },
          optimizeSSR: AppHelper.isProd(),
          hotReload: !AppHelper.isProd(),
          exposeFilename: !AppHelper.isProd(),
          transformAssetUrls: {
            'v-app-bar': 'src',
            'v-carousel-item': [
              'src',
              'lazy-src'
            ],
            'v-img': [
              'src',
              'lazy-src'
            ],
            'v-navigation-drawer': 'src',
            'v-parallax': 'src',
            'v-toolbar': 'src'
          }
        })
      ]),
    createMediaRule(/\.(png|jpe?g|gif|webp)(\?.*)?$/, 'img'),
    createMediaRule(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, 'media'),
    createRule(/\.(svg)(\?.*)?$/).use(createLoader('file-loader', {
        name: AppHelper.isProd() ? '/img/[name].[hash:8].[ext]' : 'img/[name].[ext]'
      })
    ),
    createMediaRule(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i, 'fonts'),

    ...[/\.css$/, /\.p(ost)?css$/].map((test) => createRule(test)
      .oneOf(/module/, defaultStyleLoader(isServer, styleOptions))
      .oneOf(/\?vue/, defaultStyleLoader(isServer))
      .oneOf(/\.module\.\w+$/, defaultStyleLoader(isServer, styleOptions))
      .oneOf(null, defaultStyleLoader(isServer))),

    createRule(/\.s[ac]ss$/)
      .oneOf(/module/, sassLoader(isServer, styleOptions))
      .oneOf(/\?vue/, sassLoader(isServer))
      .oneOf(/\.module\.\w+$/, sassLoader(isServer, styleOptions))
      .oneOf(null, sassLoader(isServer)),

    createRule(/\.styl(us)?$/)
      .oneOf(/module/, stylusLoader(isServer, styleOptions))
      .oneOf(/\?vue/, stylusLoader(isServer))
      .oneOf(/\.module\.\w+$/, stylusLoader(isServer, styleOptions))
      .oneOf(null, stylusLoader(isServer)),

    createRule(/.js$/)
      .use([
        cacheLoader('babel'),
        createLoader('babel-loader', {
          query: {
            presets: ['latest', 'stage-0', 'vue']
          }
        })
      ])
      .exclude((file) => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
      )),

    createRule(/\.(ts|tsx)$/)
      .exclude(/node_modules/)
      .use([
        createLoader('babel-loader'),
        createLoader<LoaderOptions>('ts-loader', {
          transpileOnly: true,
          configFile: SSRBuildConf.tsConfig,
          appendTsSuffixTo: [
            /\\.vue$/
          ]
          // happyPackMode: true,
        })
      ]),
    createRule(/\.pug$/)
      // это применяется к `<template lang="pug">` в компонентах Vue
      .oneOf(/^\?vue/, [createLoader('pug-plain-loader')])
      // это применяется к импортам pug внутри JavaScript
      .oneOf(null, [
        createLoader('raw-loader'),
        createLoader('pug-plain-loader')
      ])
  ];

  return rules.map( (rule) => rule.conf);
};
