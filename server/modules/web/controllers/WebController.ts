import { Controller, Get, Header, Param, Req, Res, Headers, Logger } from '@nestjs/common';
import {Request, Response} from 'express';
import SSRContext from '../service/SSRContext';
import SSRDevService from '../service/SSRDevService';
import LocaleHelper from '../../../../common/helper/LocaleHelper';

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

@Controller()
export class WebController {

    constructor(private ssr: SSRDevService, private context: SSRContext) {
    }

    @Get(['/dist/*', '/fonts/*'])
    asset(@Req() req: Request) {
        Logger.error(req.url, this.constructor.name);
        return this.ssr.asset(req.url);
    }

    @Get([':lang', ':lang/*', '/*'])
    @Header('Content-Type', 'text/html')
    @Header('Server', serverInfo)
    async index(@Req() req: Request,
                @Res() res: Response,
                @Param('lang') lang: string,
                @Headers('accept-language') browserLangs: string ) {
        let url = req.url;
        try {
            if (await LocaleHelper.isLangAvailable(lang)) {
                url = req.url.split(`/${lang}`)[1];
            } else {
                [lang] = browserLangs.split(',');
                lang = await LocaleHelper.isLangAvailable(lang) ? lang : LocaleHelper.defLang;
            }

            const context = await this.context.makeContext(req.url, lang);
            res.send(await this.ssr.render(context));
        } catch (e) {
            Logger.error(e, this.constructor.name);
        }




        //
        // if (!AppHelper.isProd()) {
        //     await FileHelper.writeFile(AppHelper.pathResolve('.cache/srrContext.json'), JSON.stringify(context, null, '\t'));
        //     // res.send(AppHelper.pathResolve('.cache/srrContext.json'));
        //     res.redirect(`http://localhost:${AppHelper.ssrDevPort()}${req.url}`);
        //     return;
        // }
        //
        // return this.ssr.render(context);
    }




}
