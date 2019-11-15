<template lang="pug">
    v-list
        template(v-for="(item, i) in items" )
            archive-list-item(:item="item" :key="i")
            v-divider(:key="`divider-${i}`")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ArchiveListItem from '@web/components/Archive/ArchiveListItem.vue';
    import Http from "@web/services/api/Http";

    @Component({
        components: {ArchiveListItem}
    })
    export default class ArchiveList extends Vue {
        items: any[] = [];

        // async asyncData(){
        //     this.items = await Http.get('fake')
        // }

        mounted(){
            console.error('mounted')
            // Http.get<any[]>('fake').then( (items ) => (this.items = items)).catch( console.error)
            // this.items = await Http.get('fake')
        }


    };
</script>

<style lang="scss" scoped>
</style>
