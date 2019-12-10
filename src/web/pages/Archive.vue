<template lang="pug">
    v-container
        p {{$t('Archive')}}
        archive-list

</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import ArchiveList from '@web/components/Archive/ArchiveList.vue';

    @Component({
        components: {ArchiveList}
    })
    export default class Archive extends Vue {
    }
</script>
