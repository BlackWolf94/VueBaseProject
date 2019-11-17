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


        serverPrefetch(){
            console.error('serverPrefetch');
            // return this.$store.dispatch('list/fetch')
            // this.items = await Http.get('fake')
            // this.foo = 'serverPrefetch'
        };

        beforeCreate(){
            console.error('beforeCreate')
            // console.error('created', process.env)
            // this.items = await Http.get<any[]>('fake')

        }

        created(){
            // this.items = this.$store.state.list.list;
            console.error('created')
        }

        mounted(){
            console.error('mounted');
            // this.fetchItem()
        }

        async fetchItem(){
            // this.items = await Http.get('fake')
        }

        beforeMount(){
            console.error('beforeMount')
        }


    };
</script>

<style lang="scss" scoped>
</style>
