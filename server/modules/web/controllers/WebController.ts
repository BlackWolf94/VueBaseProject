import { Controller, Get, Header, Param, Req, Res, Headers, Logger } from '@nestjs/common';
import {Request} from 'express';
import SSRContextService from '../service/SSRContextService';
import LocaleHelper from '../../../../common/helper/LocaleHelper';
import SSRService from '../service/SSRService';
import { FileHelper } from '../../../../common/helper/FileHelper';
import AppHelper from '../../../../common/helper/AppHelper';

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

@Controller()
export class WebController {

    constructor(private ssr: SSRService, private context: SSRContextService) {
    }

    @Get([':lang', ':lang/*', '/*'])
    @Header('Content-Type', 'text/html')
    @Header('Server', serverInfo)
    async index(@Req() req: Request,
                @Param('lang') lang: string,
                @Headers('accept-language') browserLangs: string ) {
        // let url = req.url;

        if (req.url.match('fonts')) {
            return this.ssr.getAssets(req.url);
        }

        // if (await LocaleHelper.isLangAvailable(lang)) {
        //     url = req.url.split(`/${lang}`)[1];
        // } else {
        //     [lang] = browserLangs.split(',');
        //     lang = await LocaleHelper.isLangAvailable(lang) ? lang : LocaleHelper.defLang;
        // }
        const context = await this.context.makeContext(req.url, lang);

        await FileHelper.writeFile(AppHelper.pathResolve('.cache/srrContext.json'),
          JSON.stringify(context, null, '\t'));

        return this.ssr.render(context);
    }

}
