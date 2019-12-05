import { Controller, Get, Header, Param, Req, Res, Headers } from '@nestjs/common';
import {Request, Response} from 'express';
import SSRService from '../service/SSRService';
import AppHelper from '@common/helper/AppHelper';
import LocaleHelper from '@common/helper/LocaleHelper';
import SSRContext from '../service/SSRContext';
import { FileHelper } from '@common/helper/FileHelper';
import SSRDevService from '../service/SSRDevService';

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

@Controller()
export class WebController {

    constructor(private ssr: SSRDevService, private context: SSRContext) {
    }

    @Get([':lang', ':lang/*', '/*'])
    @Header('Content-Type', 'text/html')
    @Header('Server', serverInfo)
    async index(@Req() req: Request,
                @Res() res: Response,
                @Param('lang') lang: string,
                @Headers('accept-language') browserLangs: string ) {
        let url = req.url;

        if (await LocaleHelper.isLangAvailable(lang)) {
            url = req.url.split(`/${lang}`)[1];
        } else {
            [lang] = browserLangs.split(',');
            lang = await LocaleHelper.isLangAvailable(lang) ? lang : LocaleHelper.defLang;
        }

        const context = await this.context.makeContext(req.url, lang);
        res.send(await this.ssr.render(context));



        if (!AppHelper.isProd()) {
            await FileHelper.writeFile(AppHelper.pathResolve('.cache/srrContext.json'), JSON.stringify(context, null, '\t'));
            // res.send(AppHelper.pathResolve('.cache/srrContext.json'));
            res.redirect(`http://localhost:${AppHelper.ssrDevPort()}${req.url}`);
            return;
        }

        return this.ssr.render(context);
    }


}
