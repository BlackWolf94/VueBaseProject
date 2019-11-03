<template lang="pug">
    v-dialog(:value="true" :max-width="400" persistent)
        v-card
            v-toolbar(:color="title.color")
                block {{title-icon}}
                v-toolbar-title
                    | {{ title.text }}
            v-card-text
                block content
                    component(v-if="activeComponent" :is="component" v-model="value" v-bind="componentProps")
                    component(v-else-if="!activeComponent" :is="component" v-bind="componentProps")
                    div.subheading  {{text}}
            block footer
                v-divider
                v-card-actions
                    v-btn( v-for="button in buttons" block @click="button.action" color="button.color")
                        v-icon {{button.icon}}
                        | {{button.text}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {TDialogButtons, TDialogTitle} from '@/plugins/dialog/builder/IDialogBuilder';

@Component({})
export default class Dialog extends Vue {

    public value: any = null;

    get text(): string {
        return '';
    }

    get title(): TDialogTitle {
        return {};
    }

    get buttons(): TDialogButtons[] {
        return [];
    }

    get component(): any {
        return null;
    }

    get componentProps(): any {
        return {};
    }

    get activeComponent(): boolean {
        return this.component && this.componentProps.value === undefined;
    }

}
</script>

<style lang="scss" scoped>
</style>
