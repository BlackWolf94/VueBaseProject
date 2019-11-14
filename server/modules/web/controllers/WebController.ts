import {Controller, Get, Header, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import SSRService from '../service/SSRService';
import AppHelper from '../../../helper/AppHelper';

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

@Controller()
export class WebController {

    constructor(private ssr: SSRService) {
    }

    @Get('*')
    @Header('Content-Type', 'text/html')
    @Header('Server', serverInfo)
    public async index(@Req() req: Request, @Res() res: Response): Promise<string> {
        if (AppHelper.isProd()) {
            res.send(await this.ssr.render(req.url));
            return ;
        }


        res.redirect(`http://localhost:${AppHelper.ssrDevPort()}${req.url}`);
    }
}
