<template lang="pug">
    v-container
        v-layout(row).pa-5
            v-flex {{$t('Archive')}}
            v-flex
                v-btn(@click="dialogShow") dialog
        archive-list

</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import ArchiveList from '@web/components/Archive/ArchiveList.vue';

    @Component({
        components: {ArchiveList}
    })
    export default class Archive extends Vue {

      dialogShow(){
        this.$dialog('Test')
          .buttonCancel('Cancel')
          .show()
      }
    }
</script>
