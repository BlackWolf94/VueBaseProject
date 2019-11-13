import {Module} from '@nestjs/common';
import WebModule from './web/WebModule';

@Module({
    imports: [WebModule],
})
export default class AppModule {}
