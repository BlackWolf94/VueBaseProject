<template lang="pug">
    div.progress-bar
        v-fade-transition
            v-progress-linear(indeterminate v-if="isShow" absolute top)
</template>

<script lang="ts">
  /**
   * @author Dmytro Zataidukh
   * @email zidadindimon@gmail.com
   * @created_at 12.12.19
   */

  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class ProgressBar extends Vue {
    isShow: boolean = false;
  }
</script>

<style scoped>
    .progress-bar {
        z-index: 10;
    }
</style>
