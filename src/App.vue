<template lang="pug">
    v-app
        v-app-bar(app)
            v-toolbar-title.headline.text-uppercase
                span Vuetify
                span.font-weight-light MATERIAL DESIGN
            v-spacer
            v-btn( text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank")
                span.mr-2 Latest Release
        v-content
            v-data-table(
                :headers="headers"
                :items="[]"
                :items-per-page="5"
                class="elevation-1")

            v-divider
            | {{ $t("test")}}
            hello-world
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Component from 'vue-class-component';

@Component({
    components: {
        HelloWorld,
    },
})
    export default class App extends Vue {
        public headers = [
            {
                text: 'Dessert (100g serving)',
                align: 'left',
                sortable: false,
                value: 'name',
            },
            {text: 'Calories', value: 'calories'},
            {text: 'Fat (g)', value: 'fat'},
            {text: 'Carbs (g)', value: 'carbs'},
            {text: 'Protein (g)', value: 'protein'},
            {text: 'Iron (%)', value: 'iron'},
        ];
    }
</script>
