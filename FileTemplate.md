# File template 

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

## Component

```vue
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
## TS Class
```typescript
export class ${NAME} {}
```


