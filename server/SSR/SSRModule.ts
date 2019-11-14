/**
 * @author Dmytro Zataidukh
 * @created_at 11/13/19
 */
import {Module} from '@nestjs/common';
import {SSRService} from './service/SSRService';
import SSRController from './SSRController';


@Module({
    controllers: [SSRController],
    providers: [SSRService],
})
export class SSRModule {

}
