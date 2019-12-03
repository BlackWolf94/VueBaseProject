import { Controller, Get, Header, Param, Req, Res, Headers } from '@nestjs/common';
import {Request, Response} from 'express';
import SSRService from '../service/SSRService';
import AppHelper from '../../../helper/AppHelper';
import LocaleHelper from '../../../helper/LocaleHelper';

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

@Controller()
export class WebController {

    constructor(private ssr: SSRService) {
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
            const [blang] = browserLangs.split(',');
            lang = await LocaleHelper.isLangAvailable(blang) ? blang : LocaleHelper.defLang;
        }

        if (!AppHelper.isProd()) {
            res.redirect(`http://localhost:${AppHelper.ssrDevPort()}${url}`);
            return;
        }

        return this.ssr.render(url);
    }


}
