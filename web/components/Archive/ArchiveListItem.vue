<template lang="pug">
    v-list-item
        v-list-item-content
            v-list-item-title {{item.firstName}} {{item.lastName}}
            v-list-item-subtitle {{item.address}}
        v-list-item-icon {{item.phone}}
        v-list-item-icon {{item.yearOld}}
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';

    type TItem = {
        firstName: string;
        lastName: string;
        address: string;
        phone: string;
        yearOld: number;
    };

    @Component({})
    export default class ArchiveListItem extends Vue {
        @Prop() item: TItem;
    }
</script>

<style lang="scss" scoped>
</style>
