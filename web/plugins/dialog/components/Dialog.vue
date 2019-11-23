<template lang="pug">
    v-dialog(:value="true" :max-width="400" persistent attach="#app")
        v-card
            block title
                v-toolbar(:color="title.color" v-if="title.text" dark)
                    v-toolbar-title
                        | {{ title.text }}
            v-card-text
                block content
                    component(v-if="activeComponent" :is="component" v-model="value" v-bind="componentProps")
                    component(v-else-if="!activeComponent" :is="component" v-bind="componentProps")
                    div.subheading  {{text}}
            block footer
                template(v-if="buttons.length")
                    v-divider
                    v-card-actions
                        v-btn.flex(v-for="(button, index) in buttons" @click="button.action" :color="button.color" :key="index")
                            v-icon {{button.icon}}
                            | {{button.text}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {IDialogButtons, IDialogTitle} from '@web/plugins/dialog/builder/IDialogBuilder';

@Component({})
export default class Dialog extends Vue {

    value: any = null;

    get text(): string {
        return '';
    }

    get title(): IDialogTitle {
        return {};
    }

    get buttons(): IDialogButtons[] {
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
