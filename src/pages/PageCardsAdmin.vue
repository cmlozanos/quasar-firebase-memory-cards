<template>
  <div class="q-pa-md">
    <q-page>
      <q-banner class="bg-grey-3 full-width" v-if="Object.entries(cards).length === 0">
        <template v-slot:avatar>
          <q-icon name="check" color="green" />
        </template>
        No Cards found
      </q-banner>
      <q-list separator>
        <card-admin
          v-for="(card,index) in cards"
          :key="index"
          :card="card"
          :id="index">
        </card-admin>
      </q-list>
    </q-page>
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn round color="primary" icon="add" @click="showModal = true"></q-btn>
    </q-page-sticky>
    <q-dialog persistent v-model="showModal">
      <add-card @close="showModal=false"/>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    cardAdmin: require('components/Card/CardAdmin.vue').default,
    addCard: require('components/Card/Modal/AddCard.vue').default
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters('cards', ['cards'])
  }
}
</script>
