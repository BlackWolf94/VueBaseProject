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
                    v-layout( v-if="item.heading" :key="i" row align-center)
                        v-flex( xs6)
                            v-subheader( v-if="item.heading") {{ item.heading }}
                        v-flex.text-xs-right(xs6)
                            v-btn( small text) edit
                    v-divider.my-3( v-else-if="item.divider" :key="i" dark)
                    v-list-item(v-else :key="i" @click="" :to="item.text")
                        v-list-item-action
                            v-icon {{item.icon}}
                        v-list-item-content
                            v-list-item-title.grey--text {{ item.text }}
        v-content.grey.lighten-4(fluid fill-height)
            router-view
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class App extends Vue {
        drawer: boolean = true;
        items = [
            { icon: 'lightbulb_outline', text: 'Notes' },
            { icon: 'touch_app', text: 'Reminders' },
            { divider: true },
            { heading: 'Labels' },
            { icon: 'add', text: 'Create new label' },
            { divider: true },
            { icon: 'archive', text: 'archive' },
            { icon: 'delete', text: 'Trash' },
            { divider: true },
            { icon: 'settings', text: 'Settings' },
            { icon: 'chat_bubble', text: 'Trash' },
            { icon: 'help', text: 'Help' },
            { icon: 'phonelink', text: 'App downloads' },
            { icon: 'keyboard', text: 'Keyboard shortcuts' },
        ]
    }
</script>
