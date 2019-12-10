/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */
import {ApiController} from '../ApiController';
import { Get, Param } from '@nestjs/common';
import faker from 'faker';

@ApiController('fake')
export default class FakeController {

    @Get()
    public index() {
        const res: any[] = [];

        for (let i = 0; i < 10; i++) {
            res.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                address: faker.address.streetAddress(),
                yearOld: faker.random.number({min: 10, max: 50}),
                phone: faker.phone.phoneNumber(),
            });
        }

        return res;
    }

    @Get(':message')
    public item(@Param('message') message: string) {
        return message;
    }
}
