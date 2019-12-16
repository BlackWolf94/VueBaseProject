<template lang="pug">
    v-container
        v-layout(row).pa-5
            v-flex {{$t('Archive')}}
            v-flex
                v-btn(@click="dialogShow('confirm')") Confirm
                v-btn(@click="dialogShow('alert')") Alert
                v-btn(@click="dialogShow('info')") Info
                v-btn(@click="dialogShow('error')") Error
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

  dialogShow(type: string) {

    this.$dialog('alert')
      .confirm(this.$t('I m a {0} dialog', type))
      .show();
  }
}
</script>
