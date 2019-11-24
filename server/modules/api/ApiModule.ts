import {Module} from '@nestjs/common';
import FakeController from './controllers/FakeController';
import LocaleController from './controllers/LocaleController';

/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */

@Module({

    imports: [],
    controllers: [FakeController, LocaleController],
    providers: [],
})
export default class ApiModule {

}
