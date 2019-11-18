import {Module} from '@nestjs/common';
import FakeController from './controllers/FakeController';

/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */

@Module({

    imports: [],
    controllers: [FakeController],
    providers: [],
})
export default class ApiModule {

}
