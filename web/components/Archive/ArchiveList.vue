<template lang="pug">
    v-list
        template(v-for="(item, i) in items" )
            archive-list-item(:item="item" :key="i")
            v-divider(:key="`divider-${i}`")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ArchiveListItem from "@web/components/Archive/ArchiveListItem.vue";

    @Component({
        components: {ArchiveListItem}
    })
    export default class ArchiveList extends Vue {
        get items(): any[] {
            return this.$store.state.list.list;
        };


        async serverPrefetch() {
            console.error("serverPrefetch");
            return this.fetchItem();
            // this.items = await Http.get('fake')
            // this.foo = 'serverPrefetch'
        };

        beforeCreate() {
            console.error("beforeCreate");

        }

        created() {
            console.error("created");
        }

        mounted() {
            console.error("mounted");
            if (!this.items.length) {
                this.fetchItem();
            }
        }

        async fetchItem() {
            return this.$store.dispatch("fetch");
        }

        beforeMounted() {
            console.error("beforeMounted");
        }


    };
</script>

<style lang="scss" scoped>
</style>
