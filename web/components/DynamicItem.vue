<template lang="pug">
    v-container
        v-layout( text-center wrap) {{message}}
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class DynamicItem extends Vue {
      get message(): string {
        return this.$store.state.data.data;
      }

      async serverPrefetch() {
        return this.$store.dispatch('fetchItem', this.$route.params.message);
      }
    }
</script>
