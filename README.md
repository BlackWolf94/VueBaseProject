# Vue base project 

Project use:
 - Type Script
 - [Pug](https://pugjs.org/api/getting-started.html)
 - [Vuetify](https://vuetifyjs.com/ru/getting-started/quick-start)
 
  
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# (WEBSTORM / PHPSTORM) 

### File template 

Component 
```
<template lang="pug">
    v-layout ${COMPONENT_NAME} #[[$END$]]#
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from 'vue-property-decorator';

    @Component({})
    export default class ${NAME} extends Vue {

    };
</script>

<style lang="scss" scoped>
</style>
```

# Internationalization (i18n)

You can use static translate file `../src/locale/*.json`  or has ability load translate from other source (db/file on server): 
```typescript
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {
    async beforeMounted() {
        /* load translate from remote server */
        const locale = await Api.get('locale/uk');
        this.$addLocale('uk', locale);
    }
}
```

Change current locale

```
this.$vuetify.lang.current = 'ru'           
```

Apply translate: 

```pug
<template lang="pug">
  div.my-component {{ $t('test') }}
</template>
``` 

More see information [Vuetify Internationalization (i18n)](https://vuetifyjs.com/ru/customization/internationalization#internationalization-i-18-n)


# Code style requirements

