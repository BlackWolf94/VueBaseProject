import {Module} from '@nestjs/common';
import TestController from './controllers/TestController';

/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */

@Module({

    imports: [],
    controllers: [TestController],
    providers: [],
})
export default class ApiModule {

}
