<template lang="pug">
    v-container.fill-height.blue--text.text-sm-center
        v-layout.text--accent-3(align-center row)
            v-flex.display-4(md12)
                p.font-weight-bold 404
                p.display-2 {{$t('Page Not Found')}}

</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class NotFound extends Vue {
    }
</script>
