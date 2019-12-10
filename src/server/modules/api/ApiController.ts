/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */

import {Controller} from '@nestjs/common';

export function ApiController(prefix: string) {
    return Controller(`/api/${prefix}`);
}
