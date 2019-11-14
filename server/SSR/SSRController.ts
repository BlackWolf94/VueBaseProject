/**
 * @author Dmytro Zataidukh
 * @created_at 11/13/19
 */
import {Controller, Get, Req} from '@nestjs/common';
import {SSRService} from './service/SSRService';
import {Request} from 'express';

@Controller()
export default class SSRController {

    constructor(private ssr: SSRService) {}

    @Get('*')
    public index(@Req() req: Request) {
        console.error(req.url);
        return this.ssr.serve(req.url);
        // return this.ssr.render()
    }
}
