<template lang="pug">
    v-app
        v-app-bar(app clipped-left color="amber")
            v-app-bar-nav-icon(@click="drawer = !drawer")
            span.title.ml-3.mr-5 Google&nbsp;<span class="font-weight-light">Keep</span>
            v-text-field(solo-inverted flat hide-details label="Search" prepend-inner-icon="search")
            v-spacer
        v-navigation-drawer( v-model="drawer" app clipped color="grey lighten-4")
            v-list( dense class="grey lighten-4")
                template( v-for="(item, i) in items")
                    v-divider.my-3( v-if="item.divider" :key="i" dark)
                    v-list-item(v-else :key="i" @click="" :to="item.text")
                        v-list-item-action
                            v-icon {{item.icon}}
                        v-list-item-content
                            v-list-item-title.grey--text {{ item.text }}
        v-content.grey.lighten-4(fluid fill-height)
            router-view
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ComponentMetaParser from "@web/services/ComponentMetaParser";

    @Component({})
    export default class App extends Vue {
        name: "App";

        $ssrContext: any;

        created() {
            const componentMeta = new ComponentMetaParser(this);
            if (componentMeta.hasMeta()) {
                this.$ssrContext.title = `${componentMeta.getTitle()}`;
            }
        }

        mounted() {
            const componentMeta = new ComponentMetaParser(this);
            if (componentMeta.hasMeta()) {
                document.title = `${componentMeta.getTitle()}`;
            }
        }

        drawer: boolean = true;
        items = [
            {icon: "lightbulb_outline", text: "Notes"},
            {icon: "touch_app", text: "Reminders"},
            {divider: true},
            {icon: "add", text: "Create new label"},
            {divider: true},
            {icon: "archive", text: "archive"},
            {icon: "delete", text: "Trash"},
            {divider: true},
        ];
    }
</script>
