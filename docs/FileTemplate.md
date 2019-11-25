# FILE TEMPLATE 

Use this file template in idea project fo quickly generate component

## File header

Add this header to file template on IDEA 

```editorconfig
#set( $MyName = "UserName" )
#set( $EMAIL = "user@mail.com" )
/**
 * @author ${MyName} 
 * @email ${EMAIL}
 * @created_at ${DATE}
 */
```

TS Class
```typescript
export class ${NAME} {}
```

## VueJs

Component

```
<template lang="pug">
    #[[$END$]]#
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';

    @Component({})
    export default class ${NAME} extends Vue {}
</script>

<style lang="scss" scoped>
</style>
```

## NestJS

API controller

path: `server/modules/api/controllers`

```
import {ApiController} from '../ApiController';
import { Get, Param } from '@nestjs/common';

@ApiController('${NAME}')
export default class ${NAME} {
    @Get()
    public index() {
    }

    @Get(':id')
    public item(@Param('id') id: string) {
        return id;
    }
}
```

Simply Controller

```
import {Controller, Get, Param, Post} from '@nestjs/common';

@Controller('${NAME}')
export default class ${NAME} {

    @Get()
    public index() {
    }

    @Get(':id')
    public get(@Param('id') id: string) {
        return id;
    }
    
    @Post(':id')
    public update(@Param('id') id: string) {
        return id;
    }
}
```

Service

```
import {Injectable} from '@nestjs/common';

@Injectable()
export default class ${NAME} {
 
}
```

Module

```
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [],
})
export default class ${NAME} {}
```
