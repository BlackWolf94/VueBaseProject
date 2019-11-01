<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title.headline.text-uppercase
        span Vuetify
        span.font-weight-light MATERIAL DESIGN
      v-spacer
      v-btn( text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank")
        span.mr-2 Latest Release
    v-content
      HelloWorld
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Component from 'vue-class-component';

@Component({
    components: {
        HelloWorld,
    },
})
export default class App extends Vue {}

</script>
