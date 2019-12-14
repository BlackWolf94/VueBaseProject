<template lang="pug">
    v-dialog(:value="true" :max-width="400" persistent attach="#app")
        v-card
            v-app-bar(:color="title.color" v-if="title.text" dark)
                span.headline {{ title.text }}
            v-card-text
                component(v-if="activeComponent" :is="component" v-model="value" v-bind="componentProps")
                component(v-else-if="!activeComponent" :is="component" v-bind="componentProps")
                div.subheading  {{text}}
            template(v-if="buttons.length")
                v-divider
                v-card-actions
                    v-btn.flex(v-for="(button, index) in buttons" @click="button.action" :color="button.color" :key="index")
                        v-icon {{button.icon}}
                        | {{button.text}}
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { IDialogButtons, IDialogTitle } from "@web/plugins/vuetify/dialog/builder/IDialogBuilder";

  @Component({})
  export default class Dialog extends Vue {

    value: any = null;

    get text(): string {
      return "";
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
