/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */
import {ApiController} from '../ApiController';
import {Get} from '@nestjs/common';

@ApiController('test')
export default class TestController {

    @Get()
    public index() {
       return 'Hello World';
    }
}
