<template lang="pug">
  v-container
    v-layout( text-center wrap)
      v-flex xs12
        v-img.my-3( :src="require('../assets/logo.svg')" contain height="200")

      v-flex( mb-4)
        h1.display-2.font-weight-bold.mb-3 Welcome to Vuetify


      v-flex( mb-5 xs12 )
        h2.headline.font-weight-bold.mb-3 What's next?
</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({})
export default class HelloWorld extends Vue {

    }

</script>
