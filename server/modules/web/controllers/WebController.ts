import {Controller, Get} from '@nestjs/common';

@Controller()
export class WebController {
    @Get()
    public index(): string {
        return 'Hello World';
    }
}
