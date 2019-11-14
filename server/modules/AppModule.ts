import {Module} from '@nestjs/common';
import WebModule from './web/WebModule';
import ApiModule from './api/ApiModule';

@Module({
    imports: [ApiModule, WebModule],
})
export default class AppModule {}
