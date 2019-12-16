import { Controller, Get, Header, Param, Req, Res, Headers, Logger } from '@nestjs/common';
import { Request} from 'express';
import SSRContextService from '../service/SSRContextService';
import SSRService from '../service/SSRService';
import AppHelper from '../../../../../common/helper/AppHelper';
import { FileHelper } from '../../../../../common/helper/FileHelper';
import LocaleHelper from '../../../helper/LocaleHelper';

const serverInfo =
    // tslint:disable-next-line:no-var-requires
    `express/${require('express/package.json').version} ` +
    // tslint:disable-next-line:no-var-requires
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

@Controller()
export class WebController {

    constructor(private ssr: SSRService, private context: SSRContextService) {
    }

    @Get('/*.*')
    async assets(@Req() req: Request) {
        return this.ssr.getAssets(req.url);
    }

    @Get([':lang', ':lang/*', '/*'])
    @Header('Content-Type', 'text/html')
    @Header('Server', serverInfo)
    async index(@Req() req: Request,
                @Param('lang') lang: string,
                @Headers('accept-language') browserLangs: string  = '') {

        if (!(await LocaleHelper.isLangAvailable(lang))) {
            [lang] = browserLangs.split(',');
            lang = await LocaleHelper.isLangAvailable(lang) ? lang : LocaleHelper.defLang;
        }
        const context = await this.context.context(req.url, lang);

        await FileHelper.writeFile(AppHelper.pathResolve('.cache/srrContext.json'),
          JSON.stringify(context, null, '\t'));

        return this.ssr.render(context);
    }

}
