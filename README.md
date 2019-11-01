# Vue base project use Type Script

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## IDEA file template 

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
````
